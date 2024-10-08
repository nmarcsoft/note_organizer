use actix_web::*;

mod note;

#[actix_web::main]
async fn main() {
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
