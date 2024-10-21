use actix_web::*;
mod db;
mod note;
mod schema;

use db::create_pool;
use diesel::*;
use note::*;

use actix_cors::Cors;
use actix_web::http::header;

#[actix_web::main]
async fn main() {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let pool = db::create_pool(&database_url);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allowed_methods(vec!["GET", "POST"])
            .allowed_headers(vec![header::AUTHORIZATION, header::ACCEPT])
            .allowed_header(header::CONTENT_TYPE)
            .supports_credentials()
            .max_age(3600);
        App::new()
            .wrap(cors)
            .app_data(web::Data::new(pool.clone()))
            .service(note::list)
            .service(add_note)
    })
    .bind("0.0.0.0:9090")
    .expect("REASON")
    .run()
    .await;
}
