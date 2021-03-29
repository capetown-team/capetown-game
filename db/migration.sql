-- Table: public.users
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

-- Table: public.themes
CREATE TABLE IF NOT EXISTS public.themes
(
    id integer NOT NULL,
    name character(50)  NOT NULL,
    hidden boolean,
    data json,
    CONSTRAINT themes_pkey PRIMARY KEY (id)
);
-- Table: public.users_theme
CREATE TABLE IF NOT EXISTS public.users_theme
(
    id integer NOT NULL,
    id_theme integer NOT NULL,
    id_user integer NOT NULL,
    CONSTRAINT users_theme_pkey PRIMARY KEY (id_user),
    CONSTRAINT id_user FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

-- Table: public.topics
CREATE TABLE IF NOT EXISTS public.topics
(
    id integer NOT NULL,
    name character(100)  NOT NULL,
    content character(400)  NOT NULL,
    id_author integer,
    CONSTRAINT topics_pkey PRIMARY KEY (id),
    CONSTRAINT id_author FOREIGN KEY (id_author)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE INDEX IF NOT EXISTS fki_id_author
    ON public.topics USING btree
    (id_author ASC NULLS LAST)
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
    id_topic integer NOT NULL,
    id_user integer NOT NULL,
    CONSTRAINT id PRIMARY KEY (id),
    CONSTRAINT id_topic FOREIGN KEY (id_topic)
        REFERENCES public.topics (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_user FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE INDEX IF NOT EXISTS fki_id_topic
    ON public.comments USING btree
    (id_topic ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS fki_id_user
    ON public.comments USING btree
    (id_user ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.topics

CREATE TABLE IF NOT EXISTS public.topics
(
    id integer NOT NULL,
    name character(100)  NOT NULL,
    content character(400)  NOT NULL,
    id_author integer,
    CONSTRAINT topics_pkey PRIMARY KEY (id),
    CONSTRAINT id_author FOREIGN KEY (id_author)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

ALTER TABLE public.topics
    OWNER to postgres;

CREATE INDEX IF NOT EXISTS  fki_id_author
    ON public.topics USING btree
    (id_author ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE INDEX IF NOT EXISTS name
    ON public.topics USING btree
    (name  ASC NULLS LAST)
    TABLESPACE pg_default;

-- Table: public.replies

CREATE TABLE IF NOT EXISTS  public.replies
(
    id integer NOT NULL,
    id_comment integer NOT NULL,
    id_user integer NOT NULL,
    content character(100),
    CONSTRAINT replies_pkey PRIMARY KEY (id),
    CONSTRAINT id_comment FOREIGN KEY (id_comment)
        REFERENCES public.comments (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT id_user FOREIGN KEY (id_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE public.replies
    OWNER to postgres;

CREATE INDEX  IF NOT EXISTS  fki_id_comment
    ON public.replies USING btree
    (id_comment ASC NULLS LAST)
    TABLESPACE pg_default;


-- insert data    

INSERT INTO users (id, first_name, second_name, login, email, phone, password)
VALUES
(1, 'Ivanov', 'Ivan', 'IvanovIvan', 'IvanovIvan@mail.ru', '89885678945', 'IvanovIvan'),
(2, 'Petrov', 'Petr', 'PetrovPetr', 'PetrovPetr@google.ru', '89885678945', 'PetrovPetr'),
(3, 'Bogdanov', 'Kirill', 'BogdanovKirill', 'BogdanovKirill@rambler.ru', '89885678945', 'BogdanovKirill'),
(4, 'Kuvaldin', 'igor', 'KuvaldinIgor', 'KuvaldinIgor@mail.ru', '89885678945', 'KuvaldinIgor'),
(5, 'Fedina', 'Alexandra', 'FedinaAlexandra', 'FedinaAlexandra@yandex.ru', '89885678945', 'FedinaAlexandra'),
(6, 'Besedin', 'Igor', 'BesedinIgor', 'BesedinIgor@mail.ru', '89885678945', 'BesedinIgor'),
(7, 'Rostov', 'Andrew', 'RostovAndrew', 'RostovAndrew@mail.ru', '89885678945', 'RostovAndrew'),
(8, 'ivanov', 'Sergei', 'IvanovSergei', 'IvanovSergei@mail.ru', '89885678945', 'IvanovSergei'),
(9, 'Dudchenko', 'Pavel', 'DudchenkoPavel', 'DudchenkoPavel@yandex.ru', '89885678945', 'DudchenkoPavel'),
(10, 'Stepanov', 'Dmitriy', 'StepanovDmitriy', 'StepanovDmitriy@mail.ru', '89885678945', 'StepanovDmitriy');

INSERT INTO themes (id, name, hidden)
VALUES
(1, 'dark', false),
(2, 'light', false);

INSERT INTO users_theme (id, id_theme, id_user)
VALUES
(1, 1, 1),
(2, 2, 2),
(3, 1, 3),
(4, 2, 4),
(5, 1, 5),
(6, 2, 6),
(7, 1, 7),
(8, 2, 8),
(9, 1, 9),
(10, 2, 10);

INSERT INTO topics (id, name, content, id_author)
VALUES
(1, 'Делимся секретами игры', 'Делимся секретами игры', 1),
(2, 'Кто на каком уровне?', 'Кто на каком уровне?', 2),
(3, 'Как пройти 10 уровень?', 'Как пройти 10 уровень?', 3),
(4, 'Баги в игре', 'Баги в игре', 4),
(5, 'Для новичков: вопросы и ответы', 'Для новичков: вопросы и ответы', 5),
(6, 'Для продвинутых пользователей: решение сложных проблем','Для продвинутых пользователей: решение сложных проблем', 6),
(7, 'Интересные проекты', 'Интересные проекты', 7),
(8, 'Новости', 'Новости', 8),
(9, 'Дополнительно', 'Дополнительно', 9),
(10, 'Общие вопросы разработки игр', 'Общие вопросы разработки игр', 10),
(11, '2D / 3D Графика, моделирование и рисование', '2D / 3D Графика, моделирование и рисование', 10),
(12, 'Ресурсы для игр', 'Ресурсы для игр', 9),
(13, 'Конкурсы', 'Конкурсы', 8),
(14, 'Статьи', 'Статьи', 7),
(15, 'Оффтоп', 'Оффтоп', 6);

INSERT INTO comments (id, content, id_topic, id_user)
VALUES
(1, 'Всем привет, кто нашел какие возможности для успешного проходения игры?', 1, 1),
(2, 'Только что прошел 1-ый уровень', 2, 2),
(3, 'Как ты до него дошел?', 3, 3),
(4, 'Заходит за стены иногда', 4, 4),
(5, 'Могу скинуть ссылку на алготим движения призраков', 5, 5),
(6, 'Алгоритм движения красного призрака', 6, 6),
(7, 'Игры похожие на пакман', 7, 7),
(8, 'Вышло обновление', 8, 8),
(9, 'По ссылке ниже можно почитать о истории создании игры', 9, 9),
(10, 'Для игры использовали gameloop', 10, 10);

INSERT INTO replies (id, content, id_comment, id_user)
VALUES
(1, 'Я нашел пару статей об алгоритме движения призрака, думаю, тогда станет понятнее как убегать от них', 1, 1),
(2, 'А я уже на 2-ом:)', 2, 2);


