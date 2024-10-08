// @generated automatically by Diesel CLI.

diesel::table! {
    notes (id) {
        id -> Int4,
        directory -> Nullable<Varchar>,
        name -> Nullable<Varchar>,
        content -> Nullable<Varchar>,
    }
}
