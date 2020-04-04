-- Create schemas

-- Create tables
CREATE TABLE IF NOT EXISTS Houses
(
    id UUID NOT NULL UNIQUE,
    house_id INTEGER,
    photo_src VARCHAR(254),
    beds_and_house VARCHAR(48),
    rating VARCHAR(16),
    description VARCHAR(120),
    price_per_night VARCHAR(30),
    related_house INTEGER,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Rentals
(
    id UUID NOT NULL,
    rentals_types VARCHAR(24),
    owner UUID,
    capacity_types VARCHAR(24),
    occupancies SMALLINT,
    capacity_min SMALLINT,
    capacity_max SMALLINT,
    max_adult SMALLINT,
    max_children SMALLINT,
    photo VARCHAR(254),
    photos UUID,
    photo_max SMALLINT,
    heading VARCHAR(60),
    subheading VARCHAR(120),
    description TEXT,
    houses_id UUID,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Photos
(
    id UUID NOT NULL,
    rentals_id UUID,
    photos VARCHAR(254),
    priimary_photo BIT,
    rentals_id UUID,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Fees
(
    id UUID NOT NULL,
    rates DECIMAL(6, 2) UNIQUE,
    terms SMALLINT,
    terms_types VARCHAR(24),
    rentals_id UUID UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Ratings
(
    id UUID NOT NULL,
    rate_types VARCHAR(40),
    avg_ratings DECIMAL(1, 3),
    total_raters SMALLINT,
    raters UUID UNIQUE,
    rentals_id UUID UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Fees
(
    id UUID NOT NULL,
    rates DECIMAL(6, 2),
    terms SMALLINT,
    terms_types VARCHAR(24),
    rentals_id UUID,
    PRIMARY KEY(id)
);


-- Create FKs
ALTER TABLE Photos
    ADD CONSTRAINT FK_photos_rentals_fk
    FOREIGN KEY (rentals_id)
    REFERENCES Rentals(id)
    MATCH FULL
;
    
ALTER TABLE Fees
    ADD CONSTRAINT FK_fees_rentals_fk
    FOREIGN KEY (rentals_id)
    REFERENCES Rentals(id)
    MATCH FULL
;
    
ALTER TABLE Ratings
    ADD CONSTRAINT FK_ratings_rentals_fk
    FOREIGN KEY (rentals_id)
    REFERENCES Rentals(id)
    MATCH FULL
;
    
ALTER TABLE Houses
    ADD    FOREIGN KEY (id)
    REFERENCES Rentals(houses_id)
    MATCH SIMPLE
;
    
ALTER TABLE Rentals
    ADD CONSTRAINT FK_houses_rentals
    FOREIGN KEY (houses_id)
    REFERENCES Houses(id)
    MATCH SIMPLE
;
    
ALTER TABLE Houses
    ADD    FOREIGN KEY (id)
    REFERENCES Rentals(id)
    MATCH SIMPLE
;
    

-- Create Indexes
CREATE INDEX occupancies_adult_idx ON Rentals (capacity_max, max_adult);
CREATE INDEX occupancies_children_idx ON Rentals (capacity_max, max_children);
CREATE INDEX fee_idx ON Fees (rates, rentals_id);
CREATE INDEX ratings_idx ON Ratings (avg_ratings, rentals_id);
CREATE INDEX fees_rentals_idx ON Fees (rates, rentals_id);

