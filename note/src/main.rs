use actix_web::*;
mod note;

use diesel::*;

#[actix_web::main]
async fn main() {
    let database_url = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    //let manager = r2d2::ConnectionManager::<PgConnection>::new(database_url);
    HttpServer::new(|| {
        App::new()
            // enable logger - always register actix-web Logger middleware last
            // register HTTP requests handlers
            .service(note::list)
    })
    .bind("0.0.0.0:9090")
    .expect("REASON")
    .run()
    .await;
}
