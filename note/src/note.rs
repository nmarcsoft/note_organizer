use actix_web::*;
use http::StatusCode;
use uuid::Uuid;

use crate::main;

pub struct Note {
    pub id: String,
    pub directory: String,
    pub name: String,
    pub content: String,
}

impl Note {
    pub fn new(name: String) -> Self {
        Self {
            id: Uuid::new_v4().to_string(),
            directory: "".to_string(),
            name,
            content: "".to_string(),
        }
    }
}

// Return all the note
#[get("/list")]
pub async fn list() -> HttpResponse {
    HttpResponse::Ok()
        .content_type(http::header::ContentType::plaintext())
        .insert_header(("X-Hdr", "sample"))
        .body("data")
}
