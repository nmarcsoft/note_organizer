use diesel::pg::PgConnection;
use diesel::r2d2::{self, ConnectionManager}; // Pour le pool

// Définir le type pour le pool de connexions PostgreSQL
pub type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

// Fonction pour créer un pool de connexions
pub fn create_pool(database_url: &str) -> DbPool {
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool")
}
