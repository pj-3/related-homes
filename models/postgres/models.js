const Sequelize = require('sequelize');

var sequelize = new Sequelize('related_rentals', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    benchmark: true,
    pool: {
        max: 100,
        min: 0,
        idle: 10000
    },
    define: {
        underscored: true,
        timestamps: false
    },
    logging: false
});


const Rentals = sequelize.define('rentals', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    heading: { type: Sequelize.STRING(254) },
    subheading: { type: Sequelize.STRING(254) },
    description: { type: Sequelize.TEXT, allowNull: true },
    rentals_types: { type: Sequelize.STRING(254) },
    term_types: { type: Sequelize.STRING(254) },
    rates: { type: Sequelize.DECIMAL(10, 2) },
    capacity_max: { type: Sequelize.INTEGER },
    max_children: { type: Sequelize.INTEGER },
    amenities: { type: Sequelize.JSON },
    owner: { type: Sequelize.INTEGER },
    created_date: { type: Sequelize.DATE, default: Date.now },
    updated_date: { type: Sequelize.DATE, default: Date.now }
}, {
    // Insert fk mapping
})

const Photos = sequelize.define('photos', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    photos: { type: Sequelize.STRING(254) },
    is_primary_photo: { type: Sequelize.BOOLEAN },
})

const Ratings = sequelize.define('ratings', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    raters_id: { type: Sequelize.INTEGER },
    voters_rating: { type: Sequelize.DECIMAL(10, 2) },
    rental_id: { type: Sequelize.INTEGER }
}, {
    indexes: [{
        unique: false,
        name: 'raters_rentals_idx',
        fields: ['raters_id', 'rental_id']
    }
    ]
}
)


Ratings.belongsTo(Rentals);
Photos.belongsTo(Rentals);

Rentals.hasMany(Ratings);
Rentals.hasMany(Photos);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
    Rentals,
    Photos,
    Ratings,
    db
}