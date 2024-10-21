use crate::db::DbPool;
use crate::schema::notes;
use actix_web::http::StatusCode;
use actix_web::{get, post, web, HttpResponse};
use diesel::prelude::*; // Importer Diesel pour les requêtes
use diesel::*;
use serde::{Deserialize, Serialize};
use serde_json;
use uuid::Uuid;
#[derive(Serialize)]
struct ApiError {
    message: String,
}

#[derive(Serialize, Queryable, Insertable, Deserialize)]
#[table_name = "notes"]
pub struct NewNote {
    pub directory: Option<String>,
    pub name: Option<String>,
    pub content: Option<String>,
}

#[derive(Serialize, Queryable, Insertable, Deserialize)]
#[table_name = "notes"]
pub struct Note {
    pub id: i32,
    pub directory: Option<String>,
    pub name: Option<String>,
    pub content: Option<String>,
}

impl Note {
    pub fn new(name_: String) -> Self {
        Self {
            id: 0,
            directory: Some("".to_string()),
            name: Some(name_),
            content: Some("".to_string()),
        }
    }
}

pub fn get_all_notes(conn: &mut PgConnection) -> Result<Vec<Note>, diesel::result::Error> {
    use crate::schema::notes::dsl::*;
    notes.load::<Note>(conn) // Charge toutes les notes de la base de données
}

// Return all the note
#[get("/list")]
pub async fn list(pool: web::Data<DbPool>) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get connection from pool");
    match web::block(move || get_all_notes(&mut conn)).await {
        Ok(notes) => {
            let notes = notes.unwrap();
            HttpResponse::Ok().json(notes)
        }
        Err(_) => {
            let error_response = ApiError {
                message: "Internal Server Error".to_string(),
            };
            HttpResponse::InternalServerError().json(error_response)
        }
    }
}

#[post("/add")]
pub async fn add_note(pool: web::Data<DbPool>, note: web::Json<NewNote>) -> HttpResponse {
    let mut conn = pool.get().expect("Failed to get connection");
    use crate::schema::notes::dsl::*;

    // Create a new note instance, id set to 0 for auto-increment
    let new_note = NewNote {
        directory: note.directory.clone(),
        name: note.name.clone(),
        content: note.content.clone(),
    };
    match diesel::insert_into(notes)
        .values(&new_note)
        .execute(&mut conn) // Execute the insertion
    {
        Ok(_) => HttpResponse::Created().finish(),
        Err(err) => {
            eprintln!("Error inserting note: {}", err);
            HttpResponse::InternalServerError().finish()
        }
    }
}
