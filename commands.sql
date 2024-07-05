CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title) VALUES (
    'Dan Abramov',
    'https://overreacted.io/writing-resilient-components/',
    'Writing Resilient Components'
);

INSERT INTO blogs (author, url, title) VALUES (
    'Martin Fowler',
    'https://martinfowler.com/articles/is-quality-worth-cost.html',
    'Is High Quality Software Worth the Cost?'
);

INSERT INTO blogs (author, url, title) VALUES (
    'Robert C. Martin',
    'https://blog.cleancoder.com/uncle-bob/2018/12/17/FPvsOO-List-processing.html',
    'IFP vs. OO List Processing'
);
