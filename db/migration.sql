﻿-- Table: public.users
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL,
    first_name character(100)  NOT NULL,
    second_name character(100)  NOT NULL,
    login character(50)  NOT NULL,
    email character(50)  NOT NULL,
    phone character(12) ,
    password character(50)  NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE IF NOT EXISTS user_id_seq;
ALTER TABLE users ALTER id SET DEFAULT NEXTVAL('user_id_seq');

-- Table: public.themes
CREATE TABLE IF NOT EXISTS public.themes
(
    id integer NOT NULL,
    name character(50)  NOT NULL,
    hidden boolean,
    data json,
    CONSTRAINT themes_pkey PRIMARY KEY (id)
);

CREATE SEQUENCE  IF NOT EXISTS theme_id_seq;
ALTER TABLE themes ALTER id SET DEFAULT NEXTVAL('theme_id_seq');
-- Table: public.users_theme
CREATE TABLE IF NOT EXISTS public.users_theme
(
    id integer NOT NULL,
    themeid integer NOT NULL,
    userid integer NOT NULL,
    CONSTRAINT users_theme_pkey PRIMARY KEY (userid),
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE SEQUENCE  IF NOT EXISTS users_theme_id_seq;
ALTER TABLE users_theme ALTER id SET DEFAULT NEXTVAL('users_theme_id_seq');

-- Table: public.topics
CREATE TABLE IF NOT EXISTS public.topics
(
    id integer NOT NULL,
    name character(100)  NOT NULL,
    content character(400)  NOT NULL,
    userid integer,
    CONSTRAINT topics_pkey PRIMARY KEY (id),
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE SEQUENCE  IF NOT EXISTS topics_id_seq;
ALTER TABLE topics ALTER id SET DEFAULT NEXTVAL('topics_id_seq');

CREATE INDEX IF NOT EXISTS fki_userId
    ON public.topics USING btree
    (userid ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS name
    ON public.topics USING btree
    (name  ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.comments
CREATE TABLE IF NOT EXISTS public.comments
(
    id integer NOT NULL,
    content character(1000)  NOT NULL,
    topicid integer NOT NULL,
    userid integer NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT topidId FOREIGN KEY (topicid)
        REFERENCES public.topics (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT userId FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE SEQUENCE IF NOT EXISTS comments_id_seq;
ALTER TABLE comments ALTER id SET DEFAULT NEXTVAL('comments_id_seq');

CREATE INDEX IF NOT EXISTS fki_topicid
    ON public.comments USING btree
    (topicid ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS fki_userid
    ON public.comments USING btree
    (userId ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.replies

CREATE TABLE IF NOT EXISTS  public.replies
(
    id integer NOT NULL,
    commentid integer NOT NULL,
    userid integer NOT NULL,
    content character(100),
    CONSTRAINT replies_pkey PRIMARY KEY (id),
    CONSTRAINT commentid FOREIGN KEY (commentid)
        REFERENCES public.comments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT userid FOREIGN KEY (userid)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE SEQUENCE  IF NOT EXISTS replies_id_seq;
ALTER TABLE replies ALTER id SET DEFAULT NEXTVAL('replies_id_seq');

CREATE INDEX  IF NOT EXISTS  fki_commentid
    ON public.replies USING btree
    (commentId ASC NULLS LAST)
    TABLESPACE pg_default;


-- insert data    

INSERT INTO users (first_name, second_name, login, email, phone, password)
VALUES
('Ivanov', 'Ivan', 'IvanovIvan', 'IvanovIvan@mail.ru', '89885678945', 'IvanovIvan'),
('Petrov', 'Petr', 'PetrovPetr', 'PetrovPetr@google.ru', '89885678945', 'PetrovPetr'),
('Bogdanov', 'Kirill', 'BogdanovKirill', 'BogdanovKirill@rambler.ru', '89885678945', 'BogdanovKirill'),
('Kuvaldin', 'igor', 'KuvaldinIgor', 'KuvaldinIgor@mail.ru', '89885678945', 'KuvaldinIgor'),
('Fedina', 'Alexandra', 'FedinaAlexandra', 'FedinaAlexandra@yandex.ru', '89885678945', 'FedinaAlexandra'),
('Besedin', 'Igor', 'BesedinIgor', 'BesedinIgor@mail.ru', '89885678945', 'BesedinIgor'),
('Rostov', 'Andrew', 'RostovAndrew', 'RostovAndrew@mail.ru', '89885678945', 'RostovAndrew'),
('ivanov', 'Sergei', 'IvanovSergei', 'IvanovSergei@mail.ru', '89885678945', 'IvanovSergei'),
('Dudchenko', 'Pavel', 'DudchenkoPavel', 'DudchenkoPavel@yandex.ru', '89885678945', 'DudchenkoPavel'),
('Stepanov', 'Dmitriy', 'StepanovDmitriy', 'StepanovDmitriy@mail.ru', '89885678945', 'StepanovDmitriy');

INSERT INTO themes (name, hidden)
VALUES
('dark', false),
('light', false);

INSERT INTO users_theme (themeid, userid)
VALUES
(1, 1),
(2, 2),
(1, 3),
(2, 4),
(1, 5),
(2, 6),
(1, 7),
(2, 8),
(1, 9),
(2, 10);

INSERT INTO topics (name, content, userid)
VALUES
('Games secret', 'Games secret', 1),
('Who is at what level?', 'Who is at what level?', 2),
('How to pass level 10?', 'How to pass level 10?', 3),
('Bugs in the game', 'Bugs in the game', 4),
('For beginners: questions and answers', 'For beginners: questions and answers', 5),
('For advanced users: solving complex problems', 'For advanced users: solving complex problems', 6),
('Interesting proects', 'Interesting proects', 7),
('News', 'News', 8),
('Extra', 'extra', 9),
('General game development issues', 'General game development issues', 10),
('2D / 3D Graphics, Modeling and Drawing', '2D / 3D Graphics, Modeling and Drawing', 10),
('Resources for games', 'Resources for games', 9),
('Contests', 'Contests', 8),
('Articles', 'Articles', 7),
('Offtop', 'Offtop', 6);

INSERT INTO comments (content, topicid, userid)
VALUES
('Всем привет, кто нашел какие возможности для успешного проходения игры?', 1, 1),
('Только что прошел 1-ый уровень', 2, 2),
('Как ты до него дошел?', 3, 3),
('Заходит за стены иногда', 4, 4),
('Могу скинуть ссылку на алготим движения призраков', 5, 5),
('Алгоритм движения красного призрака', 6, 6),
('Игры похожие на пакман', 7, 7),
('Вышло обновление', 8, 8),
('По ссылке ниже можно почитать о истории создании игры', 9, 9),
('Для игры использовали gameloop', 10, 10);

INSERT INTO replies (content, commentid, userid)
VALUES
('Я нашел пару статей об алгоритме движения призрака, думаю, тогда станет понятнее как убегать от них', 1, 1),
('А я уже на 2-ом:)', 2, 2);