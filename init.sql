CREATE TABLE pizzas (
    pizza_id    SERIAL NOT NULL CONSTRAINT pizzas_pk PRIMARY KEY,
    pizza_name  VARCHAR(128) NOT NULL,
    pizza_desc  VARCHAR(256) NOT NULL,
    pizza_url   VARCHAR(256) NOT NULL,
    pizza_price numeric(10,2) NOT NULL CONSTRAINT positive_price CHECK (pizza_price > 0)
);

CREATE TABLE ingredients (
    ingredients_id  SERIAL NOT NULL CONSTRAINT ingredients_pk PRIMARY KEY,
    pizza_id        INT NOT NULL 
        REFERENCES pizzas(pizza_id) 
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    cheese          BOOLEAN NOT NULL,
    meat            BOOLEAN NOT NULL,
    cucumbers       BOOLEAN NOT NULL,
    tomatoes        BOOLEAN NOT NULL,
    pineapple       BOOLEAN NOT NULL,
    mushrooms       BOOLEAN NOT NULL
);

CREATE TABLE ingredients_price (
    i_name  VARCHAR(64) NOT NULL 
        CONSTRAINT price_pk PRIMARY KEY,
    i_price   numeric(10,2) NOT NULL CONSTRAINT positive_price CHECK (i_price > 0)
);

CREATE TABLE comments (
    comment_id      SERIAL NOT NULL CONSTRAINT comments_pk PRIMARY KEY,
    comment_un      TEXT NOT NULL,
    comment_value   TEXT NOT NULL
);

CREATE TABLE users (
    user_id         UUID NOT NULL CONSTRAINT users_pk PRIMARY KEY,
    user_login      TEXT NOT NULL,
    user_password   TEXT NOT NULL,
    user_address    TEXT NOT NULL,
    user_phone      TEXT NOT NULL,
    user_refresh    TEXT NOT NULL
);

INSERT INTO pizzas(pizza_name, pizza_desc, pizza_url, pizza_price) VALUES ('Cheese pizza', 'Mozzarella, cheddar cheese and parmesan, Alfredos signature sauce', '/images/cheese.png', 289.00);
INSERT INTO pizzas(pizza_name, pizza_desc, pizza_url, pizza_price) VALUES ('Pepperoni', 'Spicy pepperoni, an enlarged portion of mozzarella, tomatoes, branded tomato sauce', '/images/pepperoni.png', 289.00);
INSERT INTO pizzas(pizza_name, pizza_desc, pizza_url, pizza_price) VALUES ('Cheese chicken', 'Chicken, mozzarella, cheddar and parmesan cheese, cheese sauce, tomatoes, alfredo sauce, garlic', '/images/cheese_chicken.png', 469.00);
INSERT INTO pizzas(pizza_name, pizza_desc, pizza_url, pizza_price) VALUES ('Meat pizza', 'Chicken, ham, spicy pepperoni, spicy chorizo, mozzarella, signature tomato sauce', '/images/meat.png', 469.00);
INSERT INTO pizzas(pizza_name, pizza_desc, pizza_url, pizza_price) VALUES ('Hawaiian pizza', 'Ham, pineapples, mozzarella, signature tomato sauce', '/images/hawaiian.png', 419.00);
INSERT INTO pizzas(pizza_name, pizza_desc, pizza_url, pizza_price) VALUES ('Vegetables and mushrooms', 'Ham, champignons, an increased portion of mozzarella, branded tomato sauce', '/images/v_h.png', 419.00);

INSERT INTO ingredients(pizza_id, cheese, meat, cucumbers, tomatoes, pineapple, mushrooms) VALUES (1, true, true, false, false, false, false);
INSERT INTO ingredients(pizza_id, cheese, meat, cucumbers, tomatoes, pineapple, mushrooms) VALUES (2, true, true, false, true, false, true);
INSERT INTO ingredients(pizza_id, cheese, meat, cucumbers, tomatoes, pineapple, mushrooms) VALUES (3, true, true, true, true, false, true);
INSERT INTO ingredients(pizza_id, cheese, meat, cucumbers, tomatoes, pineapple, mushrooms) VALUES (4, true, true, true, true, false, true);
INSERT INTO ingredients(pizza_id, cheese, meat, cucumbers, tomatoes, pineapple, mushrooms) VALUES (5, true, true, false, false, true, false);
INSERT INTO ingredients(pizza_id, cheese, meat, cucumbers, tomatoes, pineapple, mushrooms) VALUES (6, true, false, true, true, false, true);

INSERT INTO ingredients_price(i_name, i_price) VALUES ('cheese', 20.00);
INSERT INTO ingredients_price(i_name, i_price) VALUES ('meat', 42.00);
INSERT INTO ingredients_price(i_name, i_price) VALUES ('cucumbers', 15.00);
INSERT INTO ingredients_price(i_name, i_price) VALUES ('tomatoes', 15.00);
INSERT INTO ingredients_price(i_name, i_price) VALUES ('pineapple', 50.00);
INSERT INTO ingredients_price(i_name, i_price) VALUES ('mushrooms', 30.00);
