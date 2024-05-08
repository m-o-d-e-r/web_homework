--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0 (Debian 16.0-1.pgdg120+1)
-- Dumped by pg_dump version 16.0 (Debian 16.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(25) NOT NULL,
    cost double precision NOT NULL,
    description text NOT NULL,
    items_count integer NOT NULL,
    CONSTRAINT products_items_count_check CHECK ((items_count >= 0))
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_product_id_seq OWNER TO postgres;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    login character varying(25) NOT NULL,
    password character varying NOT NULL,
    registered timestamp without time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (product_id, name, cost, description, items_count) FROM stdin;
1	Chicco Sensitive	10	Chicco — провідний бренд європейського ринку дитячих товарів, який уже понад 60 років піклується про дитину ще на етапі її виношування, пропонуючи комплекс товарів для вагітних. А також і далі задовольняє її потреби до повноліття. На кожному етапі розвитку все продумано до дрібниць, адже функціональність, безпека та комфорт — основа філософії Chicco.\r\n\r\nПлямовивідник-спрей для тканин "Sensitive" від Chicco — найкраще рішення для делікатного догляду за дитячим одягом і білизною з самого народження. Завдяки спеціальній формулі з активним киснем плямовивідник допомагає видалити плями від трави, помідорів і фруктів.\r\n\r\nНе містить барвників\r\n\r\n    Гіпоалергенна формула плямовивідника не містить барвників\r\n\r\n\r\nДерматологічно перевірено\r\n\r\n    Пройшов тест на вміст нікелю, хрому та кобальту\r\n\r\n\r\nНатуральна формула\r\n\r\n    96% інгредієнтів натурального походження\r\n\r\n\r\nСертифікат веганського товариства\r\n\r\n    Сертифікат якості для веганських і вегетаріанських продуктів у всій Європі	10
2	L'Arbre Vert	13	Екологічний, особливо концентрований очисний засіб для видалення жиру з дуже брудних поверхонь. Призначено для поверхонь із неіржавкої сталі, емалі, плиток, фарбованих і ламінованих поверхонь, а також плит, робочих столів, витяжок, тощо.\r\nРозроблено та виготовлено з використанням сировини рослинного походження, зокрема, природних ароматів. Мінімальний ризик алергії.<\\/p>\r\n\r\nЄ екосертифікат ЄС.<\\/p>\r\n\r\nДля довкілля:\r\nНе містить фосфатів, фосфанатів, ефірів гліколю, фталатів; всі інгредієнти не мінерального походження у природних умовах повністю розкладаються; мінімальний вплив на якість води; продукт не тестований на тваринах; придатний для септичних відстійників; вироблено на сертифікованому заводі (ISO 14001).<\\/p>\r\n\r\nL'Аrbre Vert - французька компанія, що спеціалізується на розробленні та виробництві елітних засобів побутової хімії з чищення та догляду.<\\/p>	10
3	DeLaMark з ароматом вишні	15	Українська компанія, що спеціалізується на виробництві безпечної для людини та природи побутової хімії.<\\/p>\r\n\r\nУніверсальний засіб для миття кухні De La Mark з ароматом вишні відтепер представлений у великій економічній упаковці.<\\/p>\r\n\r\nМає високий вміст активних речовин і спеціально розроблений, щоб безпечно очистити всі водостійкі поверхні в кухні.<\\/p>\r\n\r\nВидаляє жир, кіптяву, нагар та інші забруднення з кухонних поверхонь усіх типів, крім алюмінію.<\\/p>\r\n\r\nДобре змивається, залишаючи свіжість і чистоту.<\\/p>	15
4	Clin Цитрус 500 мл	11	Компанія Henkel займає провідні позиції у світі завдяки брендам і технологіям трьох глобально активних бізнес-напрямків: Засоби для миття та чищення, косметика та клейові технології. Штаб-квартира компанії розташовується в Дюссельдорфі, Німеччина.<\\/p>\r\n\r\nЗасіб для миття вікон і скла Clin із запахом лимона. Clin - експерт чистоти вікон без патьоків. Завдяки своїй спеціальній формулі Clin бездоганно справляється із забрудненням на вікнах і скляних поверхнях.<\\/p>\r\n\r\nБлиск, що триває уп'ятеро довше! Формула Clin містить у своєму складі спеціальний водовідштовхувальний полімер, який створює захисний шар на поверхні. Завдяки йому вода швидко стікає, не залишаючи крапель і бруду. Тому вікна залишаються чистими та блискучими вп'ятеро довше!<\\/p>\r\n\r\nУникати вдихання речовини в розпорошеному стані. Використовувати тільки на відкритому повітрі або в добре вентильованому приміщенні.<\\/p>\r\n\r\nТермін придатності: 3 роки з дати виробництва (див. на упаковці).<\\/p>\r\n\r\nЗберігати за температури від + 5 °C до + 40 °C.<\\/p>	20
5	Містер Мускул 500мл	11	Характеристики та опис\r\n\r\n        Контактні телефони\r\n        096-101-01-71, 050-56-55-355, 063-896-48-56\r\n        Артикул\r\n        100007307\r\n        Гарантія\r\n        14 днів\r\n        Доставка/Оплата\r\n        Замовлення менше 400грн відправляються по частковій або повній передоплаті. Спецодяг та взуття тільки з частковою або повною передоплатою. Обробка та відправка замовлень - Пн - Пт. Вихідні - Сб, Нд та святкові дні\r\n\r\nЗасіб миючий д/скла Містер Мускул 500мл з розпилювачем -	0
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, name) FROM stdin;
2	ADMIN
1	USER
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, role_id, login, password, registered) FROM stdin;
1	2	qwertyuiop	6308d8f6a7ccc9f77e41be5331a52c71c0bb28ecbd4669b960d60dd505dfde9ddd7a30cd26bb308010b3819699daba7caeb791bf6a4153605fe56d1fd3d5df41	2024-04-27 18:08:11.856317
\.


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_product_id_seq', 5, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: users users_login_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_login_key UNIQUE (login);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- PostgreSQL database dump complete
--

