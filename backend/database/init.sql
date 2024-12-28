-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

-- Create the active_users view
CREATE VIEW active_users AS SELECT * FROM users WHERE is_deleted = FALSE;

-- Create the auth_log table
CREATE TABLE IF NOT EXISTS auth_log (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP,
    user_id INTEGER,
    status VARCHAR,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Create the cards table
CREATE TABLE IF NOT EXISTS cards (
    object TEXT,
    id TEXT PRIMARY KEY,
    oracle_id TEXT,
    multiverse_ids TEXT,
    tcgplayer_id INTEGER,
    name TEXT,
    lang TEXT,
    released_at TIMESTAMP,
    uri TEXT,
    scryfall_uri TEXT,
    layout TEXT,
    highres_image BOOLEAN,
    image_status TEXT,
    image_uris JSON,
    mana_cost TEXT,
    cmc INTEGER,
    type_line TEXT,
    oracle_text TEXT,
    colors TEXT,
    color_identity TEXT,
    keywords TEXT,
    produced_mana TEXT,
    legalities JSON,
    games TEXT,
    reserved BOOLEAN,
    foil BOOLEAN,
    nonfoil BOOLEAN,
    finishes TEXT,
    oversized BOOLEAN,
    promo BOOLEAN,
    reprint BOOLEAN,
    variation BOOLEAN,
    set_id TEXT,
    set TEXT,
    set_name TEXT,
    set_type TEXT,
    set_uri TEXT,
    set_search_uri TEXT,
    scryfall_set_uri TEXT,
    rulings_uri TEXT,
    prints_search_uri TEXT,
    collector_number TEXT,
    digital BOOLEAN,
    rarity TEXT,
    card_back_id TEXT,
    artist TEXT,
    artist_ids TEXT,
    illustration_id TEXT,
    border_color TEXT,
    frame TEXT,
    full_art BOOLEAN,
    textless BOOLEAN,
    booster BOOLEAN,
    story_spotlight BOOLEAN,
    prices JSON,
    related_uris JSON,
    purchase_uris JSON,
    mtgo_id INTEGER,
    mtgo_foil_id INTEGER,
    cardmarket_id INTEGER,
    power TEXT,
    toughness TEXT,
    flavor_text TEXT,
    edhrec_rank INTEGER,
    penny_rank INTEGER,
    all_parts JSON,
    promo_types TEXT,
    arena_id INTEGER,
    security_stamp TEXT,
    card_faces JSON,
    preview JSON,
    watermark TEXT,
    frame_effects TEXT,
    loyalty TEXT,
    printed_name TEXT,
    tcgplayer_etched_id INTEGER,
    flavor_name TEXT,
    attraction_lights TEXT,
    color_indicator TEXT,
    printed_type_line TEXT,
    printed_text TEXT,
    variation_of TEXT,
    life_modifier INTEGER,
    hand_modifier INTEGER,
    content_warning INTEGER
);

-- Create card Indexes
CREATE INDEX idx_cards_name ON cards(name);
CREATE INDEX idx_cards_id ON cards(id);
CREATE INDEX idx_cards_rarity ON cards(rarity);
CREATE INDEX idx_cards_set ON cards(set);

-- Create the owned table
CREATE TABLE IF NOT EXISTS owned (
    user_id INTEGER,
    card_id TEXT,
    amount INTEGER,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (card_id) REFERENCES cards (id)
);

-- Create the card_list table
CREATE TABLE IF NOT EXISTS card_list (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    name VARCHAR,
    card_id TEXT,
    amount INTEGER,
    description TEXT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (card_id) REFERENCES cards (id)
);



-- soft delete function
CREATE OR REPLACE FUNCTION soft_delete()
RETURNS TRIGGER AS $$
BEGIN
   UPDATE users SET is_deleted = TRUE WHERE id = OLD.id;
   RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- soft delete trigger
CREATE TRIGGER trigger_soft_delete
BEFORE DELETE ON users
FOR EACH ROW
EXECUTE FUNCTION soft_delete();