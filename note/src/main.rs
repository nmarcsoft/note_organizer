use actix_web::*;
mod db;
mod note;
mod schema;

use db::create_pool;
use diesel::*;
use note::*;

#[actix_web::main]
async fn main() {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let pool = db::create_pool(&database_url);
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .service(note::list)
            .service(add_note)
    })
    .bind("0.0.0.0:9090")
    .expect("REASON")
    .run()
    .await;
}
