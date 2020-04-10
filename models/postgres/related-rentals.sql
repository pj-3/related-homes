-- Create schemas
CREATE SCHEMA IF NOT EXISTS Related_rentals;


-- Create tables
CREATE TABLE IF NOT EXISTS Related_rentals.Photos
(
    id UUID NOT NULL,
    photos VARCHAR(254),
    priimary_photo BIT,
    rentals_id UUID,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Related_rentals.Ratings
(
    id UUID NOT NULL,
    rate_types VARCHAR(40),
    avg_ratings DECIMAL(1, 3),
    total_raters SMALLINT,
    raters UUID UNIQUE,
    rentals_id UUID UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Related_rentals.Rentals
(
    id UUID NOT NULL,
    rentals_types VARCHAR(24),
    owner UUID,
    occupancies SMALLINT,
    capacity_min SMALLINT,
    max_children SMALLINT,
    photo VARCHAR(254),
    heading VARCHAR(60),
    subheading VARCHAR(120),
    description TEXT,
    photos UUID,
    capacity_types VARCHAR(24),
    capacity_max SMALLINT,
    max_adult SMALLINT,
    houses_id UUID,
    rates DECIMAL(6, 2),
    times_rented SMALLINT,
    rentals_types VARCHAR(24),
    terns_types VARCHAR(24),
    amenities VARCHAR(254),
    owner INTEGER,
    PRIMARY KEY(id)
);


-- Create FKs
ALTER TABLE Related_rentals.Photos
    ADD CONSTRAINT FK_photos_rentals_fk
    FOREIGN KEY (rentals_id)
    REFERENCES Related_rentals.Rentals(id)
    MATCH FULL
;
    
ALTER TABLE Related_rentals.Ratings
    ADD CONSTRAINT FK_ratings_rentals_fk
    FOREIGN KEY (rentals_id)
    REFERENCES Related_rentals.Rentals(id)
    MATCH FULL
;
    

-- Create Indexes
CREATE INDEX ratings_idx ON Related_rentals.Ratings (avg_ratings, rentals_id);
CREATE INDEX occupancies_adult_idx ON Related_rentals.Rentals (capacity_max, max_adult);
CREATE INDEX occupancies_children_idx ON Related_rentals.Rentals (capacity_max, max_children);

