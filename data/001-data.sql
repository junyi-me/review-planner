--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    owner_id text NOT NULL,
    name text NOT NULL,
    link text,
    description text,
    offset_days json NOT NULL
);


ALTER TABLE public.project OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project_id_seq OWNER TO postgres;

--
-- Name: project_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_id_seq OWNED BY public.project.id;


--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    name text NOT NULL,
    project_id integer NOT NULL,
    link text,
    description text,
    first_iter_at date NOT NULL,
    next_iter_at date,
    iters json NOT NULL,
    last_iter_at date NOT NULL
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_id_seq OWNER TO postgres;

--
-- Name: task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_id_seq OWNED BY public.task.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    email text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: task id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN id SET DEFAULT nextval('public.task_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project (id, created_at, updated_at, owner_id, name, link, description, offset_days) FROM stdin;
2	2025-01-28 14:22:41.313617	2025-01-28 14:22:41.313617	520027f0ddc7ec50894e4f051574c61a77e04a69cc992bf8f3e4ca3437430464	System design interview - an insider's guide	https://read.amazon.com/?asin=B08B3FWYBX&ref_=kwl_kr_iv_rec_1	\N	[1,3,6]
1	2025-01-12 12:32:13.608216	2025-02-08 22:47:36.109	520027f0ddc7ec50894e4f051574c61a77e04a69cc992bf8f3e4ca3437430464	Neetcode	https://neetcode.io/roadmap	\N	[1,3,6]
3	2025-06-09 01:21:49.478281	2025-06-09 01:21:49.478281	520027f0ddc7ec50894e4f051574c61a77e04a69cc992bf8f3e4ca3437430464	Leetcode Amazon	https://leetcode.com/problem-list/7p5x763/	\N	[1,3,6]
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (id, created_at, updated_at, name, project_id, link, description, first_iter_at, next_iter_at, iters, last_iter_at) FROM stdin;
13	2025-01-24 13:21:53.850316	2025-01-30 14:11:43.906	11. Container With Most Water	1	https://leetcode.com/problems/container-with-most-water/	\N	2025-01-24	\N	[{"plannedAt":"2025-01-24","done":true},{"plannedAt":"2025-01-25","done":true},{"plannedAt":"2025-01-27","done":true},{"plannedAt":"2025-01-30","done":true}]	2025-01-30
19	2025-01-28 13:53:15.95482	2025-02-03 14:44:13.971	853. Car Fleet	1	https://leetcode.com/problems/car-fleet/	\N	2025-01-28	\N	[{"plannedAt":"2025-01-28","done":true},{"plannedAt":"2025-01-29","done":true},{"plannedAt":"2025-01-31","done":true},{"plannedAt":"2025-02-03","done":true}]	2025-02-03
24	2025-02-01 18:23:04.381604	2025-02-08 22:45:30.499	981. Time Based Key-Value Store	1	https://leetcode.com/problems/time-based-key-value-store/	\N	2025-02-01	\N	[{"plannedAt":"2025-02-01","done":true},{"plannedAt":"2025-02-02","done":true},{"plannedAt":"2025-02-04","done":true},{"plannedAt":"2025-02-07","done":true}]	2025-02-07
8	2025-01-19 11:33:47.95367	2025-01-25 23:39:19.149	36. Valid Sudoku	1	https://leetcode.com/problems/valid-sudoku/	\N	2025-01-19	\N	[{"plannedAt":"2025-01-19","done":true},{"plannedAt":"2025-01-20","done":true},{"plannedAt":"2025-01-22","done":true},{"plannedAt":"2025-01-25","done":true}]	2025-01-25
9	2025-01-20 06:23:54.201135	2025-01-26 14:35:40.757	128. Longest Consecutive Sequence	1	https://leetcode.com/problems/longest-consecutive-sequence/	\N	2025-01-20	\N	[{"plannedAt":"2025-01-20","done":true},{"plannedAt":"2025-01-21","done":true},{"plannedAt":"2025-01-23","done":true},{"plannedAt":"2025-01-26","done":true}]	2025-01-26
17	2025-01-27 20:52:08.427732	2025-02-02 21:41:52.102	22. Generate Parentheses	1	https://leetcode.com/problems/generate-parentheses/	\N	2025-01-27	\N	[{"plannedAt":"2025-01-27","done":true},{"plannedAt":"2025-01-28","done":true},{"plannedAt":"2025-01-30","done":true},{"plannedAt":"2025-02-02","done":true}]	2025-02-02
22	2025-01-31 17:20:09.556138	2025-02-07 03:07:53.94	875. Koko Eating Bananas	1	https://leetcode.com/problems/koko-eating-bananas/	\N	2025-01-31	\N	[{"plannedAt":"2025-01-31","done":true},{"plannedAt":"2025-02-01","done":true},{"plannedAt":"2025-02-03","done":true},{"plannedAt":"2025-02-06","done":true}]	2025-02-06
7	2025-01-17 03:42:44.052241	2025-01-23 04:13:30.621	238. Product of Array Except Self	1	https://leetcode.com/problems/product-of-array-except-self/	\N	2025-01-16	\N	[{"plannedAt":"2025-01-16","done":true},{"plannedAt":"2025-01-18","done":true},{"plannedAt":"2025-01-20","done":true},{"plannedAt":"2025-01-23","done":true}]	2025-01-23
5	2025-01-16 07:14:44.840519	2025-01-23 04:35:24.667	347. Top K Frequent Elements	1	https://leetcode.com/problems/top-k-frequent-elements/	\N	2025-01-16	\N	[{"plannedAt":"2025-01-16","done":true},{"plannedAt":"2025-01-18","done":true},{"plannedAt":"2025-01-20","done":true},{"plannedAt":"2025-01-23","done":true}]	2025-01-23
1	2025-01-12 12:33:06.673816	2025-01-18 08:26:29.721	217. Contains Duplicate	1	https://leetcode.com/problems/contains-duplicate/	\N	2025-01-12	\N	[{"plannedAt":"2025-01-12","done":true},{"plannedAt":"2025-01-13","done":true},{"plannedAt":"2025-01-15","done":true},{"plannedAt":"2025-01-18","done":true}]	2025-01-18
3	2025-01-14 09:06:49.053846	2025-01-21 04:33:44.701	1. Two Sum	1	https://leetcode.com/problems/two-sum/	\N	2025-01-14	\N	[{"plannedAt":"2025-01-14","done":true},{"plannedAt":"2025-01-15","done":true},{"plannedAt":"2025-01-18","done":true},{"plannedAt":"2025-01-21","done":true}]	2025-01-21
4	2025-01-15 05:05:28.401541	2025-01-22 11:12:48.27	49. Group Anagrams	1	https://leetcode.com/problems/group-anagrams/	\N	2025-01-15	\N	[{"plannedAt":"2025-01-15","done":true},{"plannedAt":"2025-01-16","done":true},{"plannedAt":"2025-01-19","done":true},{"plannedAt":"2025-01-22","done":true}]	2025-01-22
2	2025-01-12 12:33:27.272933	2025-01-19 10:59:38.253	242. Valid Anagram	1	https://leetcode.com/problems/valid-anagram/	\N	2025-01-13	\N	[{"plannedAt":"2025-01-13","done":true},{"plannedAt":"2025-01-14","done":true},{"plannedAt":"2025-01-16","done":true},{"plannedAt":"2025-01-19","done":true}]	2025-01-19
15	2025-01-26 15:03:16.715237	2025-02-01 15:22:41.587	155. Min Stack	1	https://leetcode.com/problems/min-stack/	\N	2025-01-26	\N	[{"plannedAt":"2025-01-26","done":true},{"plannedAt":"2025-01-27","done":true},{"plannedAt":"2025-01-29","done":true},{"plannedAt":"2025-02-01","done":true}]	2025-02-01
12	2025-01-23 04:37:46.974728	2025-01-29 21:40:26.253	15. 3Sum	1	https://leetcode.com/problems/3sum/	\N	2025-01-23	\N	[{"plannedAt":"2025-01-23","done":true},{"plannedAt":"2025-01-24","done":true},{"plannedAt":"2025-01-26","done":true},{"plannedAt":"2025-01-29","done":true}]	2025-01-29
14	2025-01-26 15:03:01.916779	2025-02-01 15:28:02.385	20. Valid Parentheses	1	https://leetcode.com/problems/valid-parentheses/	\N	2025-01-26	\N	[{"plannedAt":"2025-01-26","done":true},{"plannedAt":"2025-01-27","done":true},{"plannedAt":"2025-01-29","done":true},{"plannedAt":"2025-02-01","done":true}]	2025-02-01
20	2025-01-29 22:15:34.401749	2025-02-04 22:50:24.971	704. Binary Search	1	https://leetcode.com/problems/binary-search/	\N	2025-01-29	\N	[{"plannedAt":"2025-01-29","done":true},{"plannedAt":"2025-01-30","done":true},{"plannedAt":"2025-02-01","done":true},{"plannedAt":"2025-02-04","done":true}]	2025-02-04
10	2025-01-20 17:20:44.197403	2025-01-28 13:11:07.916	125. Valid Palindrome	1	https://leetcode.com/problems/valid-palindrome/	\N	2025-01-22	\N	[{"plannedAt":"2025-01-22","done":true},{"plannedAt":"2025-01-23","done":true},{"plannedAt":"2025-01-25","done":true},{"plannedAt":"2025-01-28","done":true}]	2025-01-28
11	2025-01-22 11:41:07.58963	2025-01-28 13:35:23.592	167. Two Sum II - Input Array Is Sorted	1	https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/	\N	2025-01-22	\N	[{"plannedAt":"2025-01-22","done":true},{"plannedAt":"2025-01-23","done":true},{"plannedAt":"2025-01-25","done":true},{"plannedAt":"2025-01-28","done":true}]	2025-01-28
16	2025-01-27 04:27:04.010461	2025-02-01 15:05:02.198	150. Evaluate Reverse Polish Notation	1	https://leetcode.com/problems/evaluate-reverse-polish-notation/	\N	2025-01-26	\N	[{"plannedAt":"2025-01-26","done":true},{"plannedAt":"2025-01-27","done":true},{"plannedAt":"2025-01-29","done":true},{"plannedAt":"2025-02-01","done":true}]	2025-02-01
21	2025-01-30 14:33:19.671926	2025-02-06 05:08:02.981	74. Search a 2D Matrix	1	https://leetcode.com/problems/search-a-2d-matrix/	\N	2025-01-30	\N	[{"plannedAt":"2025-01-30","done":true},{"plannedAt":"2025-01-31","done":true},{"plannedAt":"2025-02-02","done":true},{"plannedAt":"2025-02-05","done":true}]	2025-02-05
23	2025-01-31 17:54:15.85999	2025-02-07 03:01:42.669	153. Find Minimum in Rotated Sorted Array	1	https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/	\N	2025-01-31	\N	[{"plannedAt":"2025-01-31","done":true},{"plannedAt":"2025-02-01","done":true},{"plannedAt":"2025-02-03","done":true},{"plannedAt":"2025-02-06","done":true}]	2025-02-06
18	2025-01-28 13:36:55.246315	2025-02-03 14:21:10.826	739. Daily Temperatures	1	https://leetcode.com/problems/daily-temperatures/	\N	2025-01-28	\N	[{"plannedAt":"2025-01-28","done":true},{"plannedAt":"2025-01-29","done":true},{"plannedAt":"2025-01-31","done":true},{"plannedAt":"2025-02-03","done":true}]	2025-02-03
25	2025-02-02 21:59:33.841236	2025-02-08 22:44:45.798	121. Best Time to Buy and Sell Stock	1	https://leetcode.com/problems/best-time-to-buy-and-sell-stock/	\N	2025-02-02	\N	[{"plannedAt":"2025-02-02","done":true},{"plannedAt":"2025-02-03","done":true},{"plannedAt":"2025-02-05","done":true},{"plannedAt":"2025-02-08","done":true}]	2025-02-08
26	2025-02-03 16:58:59.353344	2025-02-09 21:15:02.925	3. Longest Substring Without Repeating Characters	1	https://leetcode.com/problems/longest-substring-without-repeating-characters/	\N	2025-02-03	\N	[{"plannedAt":"2025-02-03","done":true},{"plannedAt":"2025-02-04","done":true},{"plannedAt":"2025-02-06","done":true},{"plannedAt":"2025-02-09","done":true}]	2025-02-09
27	2025-02-05 03:04:49.156083	2025-02-14 17:21:48.874	567. Permutation in String	1	https://leetcode.com/problems/permutation-in-string/	\N	2025-02-08	\N	[{"plannedAt":"2025-02-08","done":true},{"plannedAt":"2025-02-09","done":true},{"plannedAt":"2025-02-11","done":true},{"plannedAt":"2025-02-14","done":true}]	2025-02-14
28	2025-02-08 19:13:50.546402	2025-02-14 18:19:46.517	206. Reverse Linked List	1	https://leetcode.com/problems/reverse-linked-list/	\N	2025-02-08	\N	[{"plannedAt":"2025-02-08","done":true},{"plannedAt":"2025-02-09","done":true},{"plannedAt":"2025-02-11","done":true},{"plannedAt":"2025-02-14","done":true}]	2025-02-14
29	2025-02-10 02:07:45.684506	2025-02-20 18:48:46.453	21. Merge Two Sorted Lists	1	https://leetcode.com/problems/merge-two-sorted-lists/	\N	2025-02-09	\N	[{"plannedAt":"2025-02-09","done":true},{"plannedAt":"2025-02-10","done":true},{"plannedAt":"2025-02-12","done":true},{"plannedAt":"2025-02-20","done":true}]	2025-02-20
30	2025-02-10 02:08:12.302985	2025-02-20 18:53:11.804	141. Linked List Cycle	1	https://leetcode.com/problems/linked-list-cycle/	\N	2025-02-09	\N	[{"plannedAt":"2025-02-09","done":true},{"plannedAt":"2025-02-10","done":true},{"plannedAt":"2025-02-12","done":true},{"plannedAt":"2025-02-20","done":true}]	2025-02-20
31	2025-02-11 03:29:19.705318	2025-02-21 17:30:31.549	143. Reorder List	1	https://leetcode.com/problems/reorder-list/	\N	2025-02-10	\N	[{"plannedAt":"2025-02-10","done":true},{"plannedAt":"2025-02-11","done":true},{"plannedAt":"2025-02-13","done":true},{"plannedAt":"2025-02-21","done":true}]	2025-02-21
38	2025-02-21 18:05:09.624308	2025-02-27 19:55:08.075	104. Maximum Depth of Binary Tree	1	https://leetcode.com/problems/maximum-depth-of-binary-tree/	\N	2025-02-21	\N	[{"plannedAt":"2025-02-21","done":true},{"plannedAt":"2025-02-22","done":true},{"plannedAt":"2025-02-24","done":true},{"plannedAt":"2025-02-27","done":true}]	2025-02-27
32	2025-02-12 00:03:14.814754	2025-02-22 15:58:40.791	19. Remove Nth Node From End of List	1	https://leetcode.com/problems/remove-nth-node-from-end-of-list/	\N	2025-02-11	\N	[{"plannedAt":"2025-02-11","done":true},{"plannedAt":"2025-02-12","done":true},{"plannedAt":"2025-02-14","done":true},{"plannedAt":"2025-02-22","done":true}]	2025-02-22
43	2025-02-25 22:03:51.766885	2025-03-03 20:21:41	235. Lowest Common Ancestor of a Binary Search Tree	1	https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/	\N	2025-02-25	\N	[{"plannedAt":"2025-02-25","done":true},{"plannedAt":"2025-02-26","done":true},{"plannedAt":"2025-02-28","done":true},{"plannedAt":"2025-03-03","done":true}]	2025-03-03
36	2025-02-20 19:18:55.279749	2025-02-27 02:05:13.9	146. LRU Cache	1	https://leetcode.com/problems/lru-cache/	\N	2025-02-20	\N	[{"plannedAt":"2025-02-20","done":true},{"plannedAt":"2025-02-21","done":true},{"plannedAt":"2025-02-23","done":true},{"plannedAt":"2025-02-26","done":true}]	2025-02-26
33	2025-02-13 02:07:22.291604	2025-02-24 02:37:01.314	138. Copy List with Random Pointer	1	https://leetcode.com/problems/copy-list-with-random-pointer/	\N	2025-02-12	\N	[{"plannedAt":"2025-02-12","done":true},{"plannedAt":"2025-02-13","done":true},{"plannedAt":"2025-02-20","done":true},{"plannedAt":"2025-02-23","done":true}]	2025-02-23
37	2025-02-21 17:59:33.935485	2025-02-27 20:03:44.835	226. Invert Binary Tree	1	https://leetcode.com/problems/invert-binary-tree/	\N	2025-02-21	\N	[{"plannedAt":"2025-02-21","done":true},{"plannedAt":"2025-02-22","done":true},{"plannedAt":"2025-02-24","done":true},{"plannedAt":"2025-02-27","done":true}]	2025-02-27
46	2025-02-28 18:28:28.036244	2025-03-06 16:27:59.476	1448. Count Good Nodes in Binary Tree	1	https://leetcode.com/problems/count-good-nodes-in-binary-tree/	\N	2025-02-28	\N	[{"plannedAt":"2025-02-28","done":true},{"plannedAt":"2025-03-01","done":true},{"plannedAt":"2025-03-03","done":true},{"plannedAt":"2025-03-06","done":true}]	2025-03-06
34	2025-02-13 22:03:44.093064	2025-02-24 17:33:32.426	2. Add Two Numbers	1	https://leetcode.com/problems/add-two-numbers/	\N	2025-02-13	\N	[{"plannedAt":"2025-02-13","done":true},{"plannedAt":"2025-02-14","done":true},{"plannedAt":"2025-02-21","done":true},{"plannedAt":"2025-02-24","done":true}]	2025-02-24
42	2025-02-24 18:40:43.179797	2025-03-02 20:53:52.564	572. Subtree of Another Tree	1	https://leetcode.com/problems/subtree-of-another-tree/	\N	2025-02-24	\N	[{"plannedAt":"2025-02-24","done":true},{"plannedAt":"2025-02-25","done":true},{"plannedAt":"2025-02-27","done":true},{"plannedAt":"2025-03-02","done":true}]	2025-03-02
35	2025-02-14 22:37:58.989302	2025-02-25 21:16:46.627	287. Find the Duplicate Number	1	https://leetcode.com/problems/find-the-duplicate-number/	\N	2025-02-14	\N	[{"plannedAt":"2025-02-14","done":true},{"plannedAt":"2025-02-20","done":true},{"plannedAt":"2025-02-22","done":true},{"plannedAt":"2025-02-25","done":true}]	2025-02-25
40	2025-02-22 17:06:50.782918	2025-02-28 18:22:42.353	110. Balanced Binary Tree	1	https://leetcode.com/problems/balanced-binary-tree/	\N	2025-02-22	\N	[{"plannedAt":"2025-02-22","done":true},{"plannedAt":"2025-02-23","done":true},{"plannedAt":"2025-02-25","done":true},{"plannedAt":"2025-02-28","done":true}]	2025-02-28
41	2025-02-24 18:27:09.52227	2025-03-02 20:56:41.835	100. Same Tree	1	https://leetcode.com/problems/same-tree/	\N	2025-02-24	\N	[{"plannedAt":"2025-02-24","done":true},{"plannedAt":"2025-02-25","done":true},{"plannedAt":"2025-02-27","done":true},{"plannedAt":"2025-03-02","done":true}]	2025-03-02
39	2025-02-21 18:12:54.12753	2025-02-27 20:15:21.915	543. Diameter of Binary Tree	1	https://leetcode.com/problems/diameter-of-binary-tree/	\N	2025-02-21	\N	[{"plannedAt":"2025-02-21","done":true},{"plannedAt":"2025-02-22","done":true},{"plannedAt":"2025-02-24","done":true},{"plannedAt":"2025-02-27","done":true}]	2025-02-27
44	2025-02-27 04:06:49.878791	2025-03-04 19:01:16.765	102. Binary Tree Level Order Traversal	1	https://leetcode.com/problems/binary-tree-level-order-traversal/	\N	2025-02-26	\N	[{"plannedAt":"2025-02-26","done":true},{"plannedAt":"2025-02-27","done":true},{"plannedAt":"2025-03-01","done":true},{"plannedAt":"2025-03-04","done":true}]	2025-03-04
48	2025-03-01 18:27:52.018074	2025-03-07 21:41:18.256	230. Kth Smallest Element in a BST	1	https://leetcode.com/problems/kth-smallest-element-in-a-bst/	\N	2025-03-01	\N	[{"plannedAt":"2025-03-01","done":true},{"plannedAt":"2025-03-02","done":true},{"plannedAt":"2025-03-04","done":true},{"plannedAt":"2025-03-07","done":true}]	2025-03-07
47	2025-03-01 17:43:00.057415	2025-03-07 16:39:13.115	98. Validate Binary Search Tree	1	https://leetcode.com/problems/validate-binary-search-tree/	\N	2025-03-01	\N	[{"plannedAt":"2025-03-01","done":true},{"plannedAt":"2025-03-02","done":true},{"plannedAt":"2025-03-04","done":true},{"plannedAt":"2025-03-07","done":true}]	2025-03-07
49	2025-03-03 22:15:42.4098	2025-03-10 05:53:46.704	208. Implement Trie (Prefix Tree)	1	https://leetcode.com/problems/implement-trie-prefix-tree/	\N	2025-03-03	\N	[{"plannedAt":"2025-03-03","done":true},{"plannedAt":"2025-03-04","done":true},{"plannedAt":"2025-03-06","done":true},{"plannedAt":"2025-03-09","done":true}]	2025-03-09
45	2025-02-27 20:19:51.153313	2025-03-05 16:48:34.582	199. Binary Tree Right Side View	1	https://leetcode.com/problems/binary-tree-right-side-view/	\N	2025-02-27	\N	[{"plannedAt":"2025-02-27","done":true},{"plannedAt":"2025-02-28","done":true},{"plannedAt":"2025-03-02","done":true},{"plannedAt":"2025-03-05","done":true}]	2025-03-05
52	2025-03-06 17:36:23.198444	2025-03-12 15:51:13.675	9. Combination Sum	1	https://leetcode.com/problems/combination-sum/	\N	2025-03-06	\N	[{"plannedAt":"2025-03-06","done":true},{"plannedAt":"2025-03-07","done":true},{"plannedAt":"2025-03-09","done":true},{"plannedAt":"2025-03-12","done":true}]	2025-03-12
67	2025-03-18 17:41:26.653289	2025-03-24 22:04:41.014	435. Non-overlapping Intervals	1	https://leetcode.com/problems/non-overlapping-intervals/	\N	2025-03-18	\N	[{"plannedAt":"2025-03-18","done":true},{"plannedAt":"2025-03-19","done":true},{"plannedAt":"2025-03-21","done":true},{"plannedAt":"2025-03-24","done":true}]	2025-03-24
62	2025-03-14 17:00:27.939182	2025-03-20 16:18:10.492	215. Kth Largest Element in an Array	1	https://leetcode.com/problems/kth-largest-element-in-an-array/	\N	2025-03-14	\N	[{"plannedAt":"2025-03-14","done":true},{"plannedAt":"2025-03-15","done":true},{"plannedAt":"2025-03-17","done":true},{"plannedAt":"2025-03-20","done":true}]	2025-03-20
72	2025-03-22 17:08:16.77377	2025-03-28 19:07:30.097	55. Jump Game	1	https://leetcode.com/problems/jump-game/	\N	2025-03-22	\N	[{"plannedAt":"2025-03-22","done":true},{"plannedAt":"2025-03-23","done":true},{"plannedAt":"2025-03-25","done":true},{"plannedAt":"2025-03-28","done":true}]	2025-03-28
53	2025-03-07 22:38:22.25971	2025-03-13 19:45:00.111	40. Combination Sum II	1	https://leetcode.com/problems/combination-sum-ii/	\N	2025-03-07	\N	[{"plannedAt":"2025-03-07","done":true},{"plannedAt":"2025-03-08","done":true},{"plannedAt":"2025-03-10","done":true},{"plannedAt":"2025-03-13","done":true}]	2025-03-13
50	2025-03-04 20:35:26.621552	2025-03-10 15:42:51.911	211. Design Add and Search Words Data Structure	1	https://leetcode.com/problems/design-add-and-search-words-data-structure/	\N	2025-03-04	\N	[{"plannedAt":"2025-03-04","done":true},{"plannedAt":"2025-03-05","done":true},{"plannedAt":"2025-03-07","done":true},{"plannedAt":"2025-03-10","done":true}]	2025-03-10
51	2025-03-05 17:32:54.396925	2025-03-11 17:17:06.812	78. Subsets	1	https://leetcode.com/problems/subsets/	\N	2025-03-05	\N	[{"plannedAt":"2025-03-05","done":true},{"plannedAt":"2025-03-06","done":true},{"plannedAt":"2025-03-08","done":true},{"plannedAt":"2025-03-11","done":true}]	2025-03-11
69	2025-03-20 17:03:01.420977	2025-03-26 17:54:22.342	Meeting Rooms II	1	https://neetcode.io/problems/meeting-schedule-ii	\N	2025-03-20	\N	[{"plannedAt":"2025-03-20","done":true},{"plannedAt":"2025-03-21","done":true},{"plannedAt":"2025-03-23","done":true},{"plannedAt":"2025-03-26","done":true}]	2025-03-26
60	2025-03-13 22:59:57.737941	2025-03-19 22:09:03.12	1046. Last Stone Weight	1	https://leetcode.com/problems/last-stone-weight/	\N	2025-03-13	\N	[{"plannedAt":"2025-03-13","done":true},{"plannedAt":"2025-03-14","done":true},{"plannedAt":"2025-03-16","done":true},{"plannedAt":"2025-03-19","done":true}]	2025-03-19
55	2025-03-10 18:43:13.620367	2025-03-16 17:58:04.644	90. Subsets II	1	https://leetcode.com/problems/subsets-ii/	\N	2025-03-10	\N	[{"plannedAt":"2025-03-10","done":true},{"plannedAt":"2025-03-11","done":true},{"plannedAt":"2025-03-13","done":true},{"plannedAt":"2025-03-16","done":true}]	2025-03-16
61	2025-03-14 16:53:30.300484	2025-03-20 16:25:25.416	973. K Closest Points to Origin	1	https://leetcode.com/problems/k-closest-points-to-origin/	\N	2025-03-14	\N	[{"plannedAt":"2025-03-14","done":true},{"plannedAt":"2025-03-15","done":true},{"plannedAt":"2025-03-17","done":true},{"plannedAt":"2025-03-20","done":true}]	2025-03-20
63	2025-03-16 04:53:56.218213	2025-03-21 20:01:40.466	621. Task Scheduler	1	https://leetcode.com/problems/task-scheduler/	\N	2025-03-15	\N	[{"plannedAt":"2025-03-15","done":true},{"plannedAt":"2025-03-16","done":true},{"plannedAt":"2025-03-18","done":true},{"plannedAt":"2025-03-21","done":true}]	2025-03-21
64	2025-03-16 19:06:13.683029	2025-03-22 16:11:37.496	355. Design Twitter	1	https://leetcode.com/problems/design-twitter/	\N	2025-03-16	\N	[{"plannedAt":"2025-03-16","done":true},{"plannedAt":"2025-03-17","done":true},{"plannedAt":"2025-03-19","done":true},{"plannedAt":"2025-03-22","done":true}]	2025-03-22
54	2025-03-09 02:58:22.141789	2025-03-14 16:41:19.718	46. Permutations	1	https://leetcode.com/problems/permutations/	\N	2025-03-08	\N	[{"plannedAt":"2025-03-08","done":true},{"plannedAt":"2025-03-09","done":true},{"plannedAt":"2025-03-11","done":true},{"plannedAt":"2025-03-14","done":true}]	2025-03-14
57	2025-03-11 18:14:11.611034	2025-03-17 16:48:49.488	131. Palindrome Partitioning	1	https://leetcode.com/problems/palindrome-partitioning/	\N	2025-03-11	\N	[{"plannedAt":"2025-03-11","done":true},{"plannedAt":"2025-03-12","done":true},{"plannedAt":"2025-03-14","done":true},{"plannedAt":"2025-03-17","done":true}]	2025-03-17
56	2025-03-10 19:04:10.501002	2025-03-16 18:14:36.035	79. Word Search	1	https://leetcode.com/problems/word-search/	\N	2025-03-10	\N	[{"plannedAt":"2025-03-10","done":true},{"plannedAt":"2025-03-11","done":true},{"plannedAt":"2025-03-13","done":true},{"plannedAt":"2025-03-16","done":true}]	2025-03-16
58	2025-03-12 16:10:37.723766	2025-03-18 16:40:03.003	17. Letter Combinations of a Phone Number	1	https://leetcode.com/problems/letter-combinations-of-a-phone-number/	\N	2025-03-12	\N	[{"plannedAt":"2025-03-12","done":true},{"plannedAt":"2025-03-13","done":true},{"plannedAt":"2025-03-15","done":true},{"plannedAt":"2025-03-18","done":true}]	2025-03-18
59	2025-03-12 16:29:55.745664	2025-03-18 16:43:12.127	703. Kth Largest Element in a Stream	1	https://leetcode.com/problems/kth-largest-element-in-a-stream/	\N	2025-03-12	\N	[{"plannedAt":"2025-03-12","done":true},{"plannedAt":"2025-03-13","done":true},{"plannedAt":"2025-03-15","done":true},{"plannedAt":"2025-03-18","done":true}]	2025-03-18
71	2025-03-22 17:07:38.892736	2025-03-28 19:12:25.56	45. Jump Game II	1	https://leetcode.com/problems/jump-game-ii/	\N	2025-03-22	\N	[{"plannedAt":"2025-03-22","done":true},{"plannedAt":"2025-03-23","done":true},{"plannedAt":"2025-03-25","done":true},{"plannedAt":"2025-03-28","done":true}]	2025-03-28
65	2025-03-17 17:17:00.4831	2025-03-23 14:48:11.393	57. Insert Interval	1	https://leetcode.com/problems/insert-interval/	\N	2025-03-17	\N	[{"plannedAt":"2025-03-17","done":true},{"plannedAt":"2025-03-18","done":true},{"plannedAt":"2025-03-20","done":true},{"plannedAt":"2025-03-23","done":true}]	2025-03-23
73	2025-03-23 15:20:33.344248	2025-03-29 16:49:43.094	134. Gas Station	1	https://leetcode.com/problems/gas-station/	\N	2025-03-23	\N	[{"plannedAt":"2025-03-23","done":true},{"plannedAt":"2025-03-24","done":true},{"plannedAt":"2025-03-26","done":true},{"plannedAt":"2025-03-29","done":true}]	2025-03-29
70	2025-03-21 22:26:49.026281	2025-03-27 15:35:56.81	53. Maximum Subarray	1	https://leetcode.com/problems/maximum-subarray/	\N	2025-03-21	\N	[{"plannedAt":"2025-03-21","done":true},{"plannedAt":"2025-03-22","done":true},{"plannedAt":"2025-03-24","done":true},{"plannedAt":"2025-03-27","done":true}]	2025-03-27
66	2025-03-18 17:41:19.158653	2025-03-24 21:58:33.88	56. Merge Intervals	1	https://leetcode.com/problems/merge-intervals/	\N	2025-03-18	\N	[{"plannedAt":"2025-03-18","done":true},{"plannedAt":"2025-03-19","done":true},{"plannedAt":"2025-03-21","done":true},{"plannedAt":"2025-03-24","done":true}]	2025-03-24
68	2025-03-19 22:25:59.474258	2025-03-25 19:18:43.936	Meeting Rooms	1	https://neetcode.io/problems/meeting-schedule	\N	2025-03-19	\N	[{"plannedAt":"2025-03-19","done":true},{"plannedAt":"2025-03-20","done":true},{"plannedAt":"2025-03-22","done":true},{"plannedAt":"2025-03-25","done":true}]	2025-03-25
81	2025-03-31 16:00:41.335377	2025-04-06 22:07:08.11	Islands and Treasure	1	https://neetcode.io/problems/islands-and-treasure	\N	2025-03-31	\N	[{"plannedAt":"2025-03-31","done":true},{"plannedAt":"2025-04-01","done":true},{"plannedAt":"2025-04-03","done":true},{"plannedAt":"2025-04-06","done":true}]	2025-04-06
75	2025-03-26 02:19:05.28856	2025-03-31 15:54:49.38	1899. Merge Triplets to Form Target Triplet	1	https://leetcode.com/problems/merge-triplets-to-form-target-triplet/	\N	2025-03-25	\N	[{"plannedAt":"2025-03-25","done":true},{"plannedAt":"2025-03-26","done":true},{"plannedAt":"2025-03-28","done":true},{"plannedAt":"2025-03-31","done":true}]	2025-03-31
92	2025-04-10 22:05:12.327325	2025-04-16 16:58:57.162	198. House Robber	1	https://leetcode.com/problems/house-robber/	\N	2025-04-10	\N	[{"plannedAt":"2025-04-10","done":true},{"plannedAt":"2025-04-11","done":true},{"plannedAt":"2025-04-13","done":true},{"plannedAt":"2025-04-16","done":true}]	2025-04-16
79	2025-03-30 00:28:49.245074	2025-04-04 16:55:39.183	695. Max Area of Island	1	https://leetcode.com/problems/max-area-of-island/	\N	2025-03-29	\N	[{"plannedAt":"2025-03-29","done":true},{"plannedAt":"2025-03-30","done":true},{"plannedAt":"2025-04-01","done":true},{"plannedAt":"2025-04-04","done":true}]	2025-04-04
76	2025-03-26 18:44:20.91232	2025-04-02 02:01:36.769	763. Partition Labels	1	https://leetcode.com/problems/partition-labels/	\N	2025-03-26	\N	[{"plannedAt":"2025-03-26","done":true},{"plannedAt":"2025-03-27","done":true},{"plannedAt":"2025-03-29","done":true},{"plannedAt":"2025-04-01","done":true}]	2025-04-01
82	2025-04-02 02:49:05.221903	2025-04-07 15:50:21.252	994. Rotting Oranges	1	https://leetcode.com/problems/rotting-oranges/	\N	2025-04-01	\N	[{"plannedAt":"2025-04-01","done":true},{"plannedAt":"2025-04-02","done":true},{"plannedAt":"2025-04-04","done":true},{"plannedAt":"2025-04-07","done":true}]	2025-04-07
84	2025-04-03 18:07:34.042997	2025-04-09 17:08:40.014	130. Surrounded Regions	1	https://leetcode.com/problems/surrounded-regions/	\N	2025-04-03	\N	[{"plannedAt":"2025-04-03","done":true},{"plannedAt":"2025-04-04","done":true},{"plannedAt":"2025-04-06","done":true},{"plannedAt":"2025-04-09","done":true}]	2025-04-09
80	2025-03-31 01:58:11.719954	2025-04-06 05:19:34.468	133. Clone Graph	1	https://leetcode.com/problems/clone-graph/	\N	2025-03-30	\N	[{"plannedAt":"2025-03-30","done":true},{"plannedAt":"2025-03-31","done":true},{"plannedAt":"2025-04-02","done":true},{"plannedAt":"2025-04-05","done":true}]	2025-04-05
87	2025-04-06 22:31:13.456049	2025-04-12 16:52:59.687	Graph Valid Tree	1	https://neetcode.io/problems/valid-tree	\N	2025-04-06	\N	[{"plannedAt":"2025-04-06","done":true},{"plannedAt":"2025-04-07","done":true},{"plannedAt":"2025-04-09","done":true},{"plannedAt":"2025-04-12","done":true}]	2025-04-12
86	2025-04-06 05:47:47.828765	2025-04-11 17:32:18.307	210. Course Schedule II	1	https://leetcode.com/problems/course-schedule-ii/	\N	2025-04-05	\N	[{"plannedAt":"2025-04-05","done":true},{"plannedAt":"2025-04-06","done":true},{"plannedAt":"2025-04-08","done":true},{"plannedAt":"2025-04-11","done":true}]	2025-04-11
77	2025-03-27 16:26:47.554862	2025-04-03 03:20:13.769	678. Valid Parenthesis String	1	https://leetcode.com/problems/valid-parenthesis-string/	\N	2025-03-27	\N	[{"plannedAt":"2025-03-27","done":true},{"plannedAt":"2025-03-28","done":true},{"plannedAt":"2025-03-30","done":true},{"plannedAt":"2025-04-02","done":true}]	2025-04-02
78	2025-03-28 17:43:06.558752	2025-04-03 17:40:55.157	200. Number of Islands	1	https://leetcode.com/problems/number-of-islands/	\N	2025-03-28	\N	[{"plannedAt":"2025-03-28","done":true},{"plannedAt":"2025-03-29","done":true},{"plannedAt":"2025-03-31","done":true},{"plannedAt":"2025-04-03","done":true}]	2025-04-03
83	2025-04-03 03:59:24.509327	2025-04-08 16:54:19.86	417. Pacific Atlantic Water Flow	1	https://leetcode.com/problems/pacific-atlantic-water-flow/	\N	2025-04-02	\N	[{"plannedAt":"2025-04-02","done":true},{"plannedAt":"2025-04-03","done":true},{"plannedAt":"2025-04-05","done":true},{"plannedAt":"2025-04-08","done":true}]	2025-04-08
98	2025-04-16 22:26:39.981842	2025-04-22 14:10:43.398	152. Maximum Product Subarray	1	https://leetcode.com/problems/maximum-product-subarray/	\N	2025-04-16	\N	[{"plannedAt":"2025-04-16","done":true},{"plannedAt":"2025-04-17","done":true},{"plannedAt":"2025-04-19","done":true},{"plannedAt":"2025-04-22","done":true}]	2025-04-22
74	2025-03-24 22:26:51.971501	2025-04-11 17:45:08.062	846. Hand of Straights	1	https://leetcode.com/problems/hand-of-straights/	\N	2025-03-24	\N	[{"plannedAt":"2025-03-24","done":true},{"plannedAt":"2025-03-25","done":true},{"plannedAt":"2025-03-27","done":true},{"plannedAt":"2025-03-30","done":true},{"plannedAt":"2025-04-11","done":true}]	2025-04-11
85	2025-04-04 17:13:49.935322	2025-04-10 21:11:38.097	207. Course Schedule	1	https://leetcode.com/problems/course-schedule/	\N	2025-04-04	\N	[{"plannedAt":"2025-04-04","done":true},{"plannedAt":"2025-04-05","done":true},{"plannedAt":"2025-04-07","done":true},{"plannedAt":"2025-04-10","done":true}]	2025-04-10
90	2025-04-09 17:34:33.549686	2025-04-15 16:22:37.935	70. Climbing Stairs	1	https://leetcode.com/problems/climbing-stairs/	\N	2025-04-09	\N	[{"plannedAt":"2025-04-09","done":true},{"plannedAt":"2025-04-10","done":true},{"plannedAt":"2025-04-12","done":true},{"plannedAt":"2025-04-15","done":true}]	2025-04-15
97	2025-04-15 20:58:46.149276	2025-04-21 14:07:12.139	322. Coin Change	1	https://leetcode.com/problems/coin-change/	\N	2025-04-15	\N	[{"plannedAt":"2025-04-15","done":true},{"plannedAt":"2025-04-16","done":true},{"plannedAt":"2025-04-18","done":true},{"plannedAt":"2025-04-21","done":true}]	2025-04-21
88	2025-04-07 17:38:48.191355	2025-04-13 19:43:46.669	Number of Connected Components in an Undirected Graph	1	https://neetcode.io/problems/count-connected-components	\N	2025-04-07	\N	[{"plannedAt":"2025-04-07","done":true},{"plannedAt":"2025-04-08","done":true},{"plannedAt":"2025-04-10","done":true},{"plannedAt":"2025-04-13","done":true}]	2025-04-13
95	2025-04-13 20:10:22.452903	2025-04-20 02:52:43.206	647. Palindromic Substrings	1	https://leetcode.com/problems/palindromic-substrings/	\N	2025-04-13	\N	[{"plannedAt":"2025-04-13","done":true},{"plannedAt":"2025-04-14","done":true},{"plannedAt":"2025-04-16","done":true},{"plannedAt":"2025-04-19","done":true}]	2025-04-19
89	2025-04-08 17:43:01.693503	2025-04-14 20:16:16.374	684. Redundant Connection	1	https://leetcode.com/problems/redundant-connection/	\N	2025-04-08	\N	[{"plannedAt":"2025-04-08","done":true},{"plannedAt":"2025-04-09","done":true},{"plannedAt":"2025-04-11","done":true},{"plannedAt":"2025-04-14","done":true}]	2025-04-14
91	2025-04-09 18:49:27.403278	2025-04-15 16:16:42.749	746. Min Cost Climbing Stairs	1	https://leetcode.com/problems/min-cost-climbing-stairs/	\N	2025-04-09	\N	[{"plannedAt":"2025-04-09","done":true},{"plannedAt":"2025-04-10","done":true},{"plannedAt":"2025-04-12","done":true},{"plannedAt":"2025-04-15","done":true}]	2025-04-15
96	2025-04-14 20:58:37.7461	2025-04-21 13:15:47.07	91. Decode Ways	1	https://leetcode.com/problems/decode-ways/	\N	2025-04-14	\N	[{"plannedAt":"2025-04-14","done":true},{"plannedAt":"2025-04-15","done":true},{"plannedAt":"2025-04-17","done":true},{"plannedAt":"2025-04-20","done":true}]	2025-04-20
94	2025-04-12 18:22:33.924587	2025-04-18 16:19:20.281	5. Longest Palindromic Substring	1	https://leetcode.com/problems/longest-palindromic-substring/	\N	2025-04-12	\N	[{"plannedAt":"2025-04-12","done":true},{"plannedAt":"2025-04-13","done":true},{"plannedAt":"2025-04-15","done":true},{"plannedAt":"2025-04-18","done":true}]	2025-04-18
93	2025-04-11 17:47:32.565348	2025-04-17 20:50:26.974	213. House Robber II	1	https://leetcode.com/problems/house-robber-ii/	\N	2025-04-11	\N	[{"plannedAt":"2025-04-11","done":true},{"plannedAt":"2025-04-12","done":true},{"plannedAt":"2025-04-14","done":true},{"plannedAt":"2025-04-17","done":true}]	2025-04-17
108	2025-04-27 03:18:43.795217	2025-05-02 17:30:03.888	72. Edit Distance	1	https://leetcode.com/problems/edit-distance/	\N	2025-04-26	\N	[{"plannedAt":"2025-04-26","done":true},{"plannedAt":"2025-04-27","done":true},{"plannedAt":"2025-04-29","done":true},{"plannedAt":"2025-05-02","done":true}]	2025-05-02
101	2025-04-20 03:48:01.286168	2025-04-25 16:47:16.681	416. Partition Equal Subset Sum	1	https://leetcode.com/problems/partition-equal-subset-sum/	\N	2025-04-19	\N	[{"plannedAt":"2025-04-19","done":true},{"plannedAt":"2025-04-20","done":true},{"plannedAt":"2025-04-22","done":true},{"plannedAt":"2025-04-25","done":true}]	2025-04-25
109	2025-04-28 04:08:33.289943	2025-05-04 15:18:08.584	743. Network Delay Time	1	https://leetcode.com/problems/network-delay-time/	\N	2025-04-28	\N	[{"plannedAt":"2025-04-28","done":true},{"plannedAt":"2025-04-29","done":true},{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-04","done":true}]	2025-05-04
99	2025-04-17 21:52:51.436457	2025-04-23 14:03:06.473	139. Word Break	1	https://leetcode.com/problems/word-break/	\N	2025-04-17	\N	[{"plannedAt":"2025-04-17","done":true},{"plannedAt":"2025-04-18","done":true},{"plannedAt":"2025-04-20","done":true},{"plannedAt":"2025-04-23","done":true}]	2025-04-23
116	2025-04-30 20:03:41.271867	2025-05-06 18:49:57.951	136. Single Number	1	https://leetcode.com/problems/single-number/	\N	2025-04-30	\N	[{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-06","done":true}]	2025-05-06
105	2025-04-23 14:25:12.386642	2025-04-29 13:46:27.472	518. Coin Change II	1	https://leetcode.com/problems/coin-change-ii/description/	\N	2025-04-23	\N	[{"plannedAt":"2025-04-23","done":true},{"plannedAt":"2025-04-24","done":true},{"plannedAt":"2025-04-26","done":true},{"plannedAt":"2025-04-29","done":true}]	2025-04-29
100	2025-04-18 17:17:06.013888	2025-04-24 20:28:48.332	300. Longest Increasing Subsequence	1	https://leetcode.com/problems/longest-increasing-subsequence/	\N	2025-04-18	\N	[{"plannedAt":"2025-04-18","done":true},{"plannedAt":"2025-04-19","done":true},{"plannedAt":"2025-04-21","done":true},{"plannedAt":"2025-04-24","done":true}]	2025-04-24
114	2025-04-30 13:21:49.336387	2025-05-06 18:50:31.503	Chapter 3	2		\N	2025-04-30	\N	[{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-06","done":true}]	2025-05-06
102	2025-04-21 18:32:13.309199	2025-04-28 03:28:39.481	62. Unique Paths	1	https://leetcode.com/problems/unique-paths/	\N	2025-04-21	\N	[{"plannedAt":"2025-04-21","done":true},{"plannedAt":"2025-04-22","done":true},{"plannedAt":"2025-04-24","done":true},{"plannedAt":"2025-04-27","done":true}]	2025-04-27
103	2025-04-21 18:54:01.512705	2025-04-28 03:38:36.09	1143. Longest Common Subsequence	1	https://leetcode.com/problems/longest-common-subsequence/	\N	2025-04-21	\N	[{"plannedAt":"2025-04-21","done":true},{"plannedAt":"2025-04-22","done":true},{"plannedAt":"2025-04-24","done":true},{"plannedAt":"2025-04-27","done":true}]	2025-04-27
104	2025-04-22 15:31:07.741815	2025-04-29 01:38:32.742	309. Best Time to Buy and Sell Stock with Cooldown	1	https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/	\N	2025-04-22	\N	[{"plannedAt":"2025-04-22","done":true},{"plannedAt":"2025-04-23","done":true},{"plannedAt":"2025-04-25","done":true},{"plannedAt":"2025-04-28","done":true}]	2025-04-28
119	2025-05-01 13:35:17.336547	2025-05-08 01:55:47.015	Chapter 6	2		\N	2025-05-01	\N	[{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-04","done":true},{"plannedAt":"2025-05-07","done":true}]	2025-05-07
106	2025-04-24 13:14:12.478487	2025-04-30 15:41:22.727	494. Target Sum	1	https://leetcode.com/problems/target-sum/	\N	2025-04-24	\N	[{"plannedAt":"2025-04-24","done":true},{"plannedAt":"2025-04-25","done":true},{"plannedAt":"2025-04-27","done":true},{"plannedAt":"2025-04-30","done":true}]	2025-04-30
120	2025-05-01 15:13:10.280713	2025-05-08 00:49:00.803	338. Counting Bits	1	https://leetcode.com/problems/counting-bits/	\N	2025-05-01	\N	[{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-04","done":true},{"plannedAt":"2025-05-07","done":true}]	2025-05-07
111	2025-04-29 19:34:38.57825	2025-05-05 23:06:29.949	787. Cheapest Flights Within K Stops	1	https://leetcode.com/problems/cheapest-flights-within-k-stops/	\N	2025-04-29	\N	[{"plannedAt":"2025-04-29","done":true},{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-05","done":true}]	2025-05-05
113	2025-04-30 01:44:10.882896	2025-05-05 13:36:29.088	Chapter 2	2		\N	2025-04-29	\N	[{"plannedAt":"2025-04-29","done":true},{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-05","done":true}]	2025-05-05
121	2025-05-01 15:20:54.679037	2025-05-08 00:46:31.169	190. Reverse Bits	1	https://leetcode.com/problems/reverse-bits/	\N	2025-05-01	\N	[{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-04","done":true},{"plannedAt":"2025-05-07","done":true}]	2025-05-07
110	2025-04-29 03:13:28.562483	2025-05-04 15:06:50.633	1584. Min Cost to Connect All Points	1	https://leetcode.com/problems/min-cost-to-connect-all-points/	\N	2025-04-28	\N	[{"plannedAt":"2025-04-28","done":true},{"plannedAt":"2025-04-29","done":true},{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-04","done":true}]	2025-05-04
118	2025-05-01 13:35:05.187229	2025-05-08 01:55:46.156	Chapter 5	2		\N	2025-05-01	\N	[{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-04","done":true},{"plannedAt":"2025-05-07","done":true}]	2025-05-07
117	2025-04-30 20:03:54.794863	2025-05-06 18:47:31.669	191. Number of 1 Bits	1	https://leetcode.com/problems/number-of-1-bits/	\N	2025-04-30	\N	[{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-06","done":true}]	2025-05-06
107	2025-04-25 19:01:11.185779	2025-05-01 21:43:18.652	97. Interleaving String	1	https://leetcode.com/problems/interleaving-string/	\N	2025-04-25	\N	[{"plannedAt":"2025-04-25","done":true},{"plannedAt":"2025-04-26","done":true},{"plannedAt":"2025-04-28","done":true},{"plannedAt":"2025-05-01","done":true}]	2025-05-01
123	2025-05-02 16:33:19.628099	2025-05-09 03:03:17.758	268. Missing Number	1	https://leetcode.com/problems/missing-number/	\N	2025-05-02	\N	[{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-05","done":true},{"plannedAt":"2025-05-08","done":true}]	2025-05-08
115	2025-04-30 13:50:44.807358	2025-05-06 19:19:46.567	Chapter 4	2		\N	2025-04-30	\N	[{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-01","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-06","done":true}]	2025-05-06
127	2025-05-04 02:33:29.592785	2025-05-12 03:17:25.958	Chapter 9	2		\N	2025-05-03	2025-05-25	[{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-04","done":true},{"plannedAt":"2025-05-09","done":true},{"plannedAt":"2025-05-25","done":false}]	2025-05-25
146	2025-05-27 02:24:06.26672	2025-06-01 16:29:29.009	778. Swim in Rising Water	1	https://leetcode.com/problems/swim-in-rising-water/	\N	2025-05-26	\N	[{"plannedAt":"2025-05-26","done":true},{"plannedAt":"2025-05-27","done":true},{"plannedAt":"2025-05-29","done":true},{"plannedAt":"2025-06-01","done":true}]	2025-06-01
131	2025-05-12 03:18:09.882161	2025-05-17 23:18:35.329	42. Trapping Rain Water	1	https://leetcode.com/problems/trapping-rain-water/	\N	2025-05-11	\N	[{"plannedAt":"2025-05-11","done":true},{"plannedAt":"2025-05-12","done":true},{"plannedAt":"2025-05-14","done":true},{"plannedAt":"2025-05-17","done":true}]	2025-05-17
112	2025-04-30 01:44:03.643811	2025-05-05 13:36:28.414	Chapter 1	2		\N	2025-04-29	\N	[{"plannedAt":"2025-04-29","done":true},{"plannedAt":"2025-04-30","done":true},{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-05","done":true}]	2025-05-05
132	2025-05-12 03:54:47.934981	2025-05-17 23:24:10.069	84. Largest Rectangle in Histogram	1	https://leetcode.com/problems/largest-rectangle-in-histogram/	\N	2025-05-11	\N	[{"plannedAt":"2025-05-11","done":true},{"plannedAt":"2025-05-12","done":true},{"plannedAt":"2025-05-14","done":true},{"plannedAt":"2025-05-17","done":true}]	2025-05-17
148	2025-05-28 20:50:37.984767	2025-06-03 15:42:49.587	329. Longest Increasing Path in a Matrix	1	https://leetcode.com/problems/longest-increasing-path-in-a-matrix/	\N	2025-05-28	\N	[{"plannedAt":"2025-05-28","done":true},{"plannedAt":"2025-05-29","done":true},{"plannedAt":"2025-05-31","done":true},{"plannedAt":"2025-06-03","done":true}]	2025-06-03
135	2025-05-14 20:55:26.730953	2025-05-21 19:08:19.415	239. Sliding Window Maximum	1	https://leetcode.com/problems/sliding-window-maximum/	\N	2025-05-14	\N	[{"plannedAt":"2025-05-14","done":true},{"plannedAt":"2025-05-15","done":true},{"plannedAt":"2025-05-17","done":true},{"plannedAt":"2025-05-20","done":true}]	2025-05-20
129	2025-05-06 01:44:52.948221	2025-05-08 01:44:30.146	15. 3Sum	1	https://leetcode.com/problems/3sum/	\N	2025-05-05	\N	[{"plannedAt":"2025-05-05","done":true},{"plannedAt":"2025-05-07","done":true}]	2025-05-07
124	2025-05-02 17:33:21.711037	2025-05-12 03:16:09.821	Chapter 7	2		\N	2025-05-02	2025-05-25	[{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-05","done":true},{"plannedAt":"2025-05-25","done":false}]	2025-05-25
128	2025-05-04 02:33:40.046193	2025-05-12 03:16:22.174	Chapter 10	2		\N	2025-05-04	2025-05-25	[{"plannedAt":"2025-05-04","done":true},{"plannedAt":"2025-05-06","done":true},{"plannedAt":"2025-05-25","done":false},{"plannedAt":"2025-05-28","done":false}]	2025-05-28
138	2025-05-19 02:42:41.484292	2025-05-24 23:55:55.58	124. Binary Tree Maximum Path Sum	1	https://leetcode.com/problems/binary-tree-maximum-path-sum/	\N	2025-05-18	\N	[{"plannedAt":"2025-05-18","done":true},{"plannedAt":"2025-05-19","done":true},{"plannedAt":"2025-05-21","done":true},{"plannedAt":"2025-05-24","done":true}]	2025-05-24
130	2025-05-06 17:16:04.890204	2025-05-12 03:16:45.425	Chapter 11	2		\N	2025-05-06	2025-05-25	[{"plannedAt":"2025-05-06","done":true},{"plannedAt":"2025-05-07","done":true},{"plannedAt":"2025-05-25","done":false},{"plannedAt":"2025-05-28","done":false}]	2025-05-28
125	2025-05-02 17:33:26.44841	2025-05-12 03:17:11.846	Chapter 8	2		\N	2025-05-02	2025-05-25	[{"plannedAt":"2025-05-02","done":true},{"plannedAt":"2025-05-03","done":true},{"plannedAt":"2025-05-08","done":true},{"plannedAt":"2025-05-25","done":false}]	2025-05-25
136	2025-05-15 15:23:20.774471	2025-05-21 21:06:13.564	23. Merge k Sorted Lists	1	https://leetcode.com/problems/merge-k-sorted-lists/	\N	2025-05-15	\N	[{"plannedAt":"2025-05-15","done":true},{"plannedAt":"2025-05-16","done":true},{"plannedAt":"2025-05-18","done":true},{"plannedAt":"2025-05-21","done":true}]	2025-05-21
133	2025-05-13 03:29:00.522691	2025-05-18 22:15:53.438	4. Median of Two Sorted Arrays	1	https://leetcode.com/problems/median-of-two-sorted-arrays/	\N	2025-05-12	\N	[{"plannedAt":"2025-05-12","done":true},{"plannedAt":"2025-05-13","done":true},{"plannedAt":"2025-05-15","done":true},{"plannedAt":"2025-05-18","done":true}]	2025-05-18
137	2025-05-18 00:43:34.087402	2025-05-23 17:03:55.19	25. Reverse Nodes in k-Group	1	https://leetcode.com/problems/reverse-nodes-in-k-group/	\N	2025-05-17	\N	[{"plannedAt":"2025-05-17","done":true},{"plannedAt":"2025-05-18","done":true},{"plannedAt":"2025-05-20","done":true},{"plannedAt":"2025-05-23","done":true}]	2025-05-23
134	2025-05-14 00:55:06.164903	2025-05-19 16:45:29.941	76. Minimum Window Substring	1	https://leetcode.com/problems/minimum-window-substring/	\N	2025-05-13	\N	[{"plannedAt":"2025-05-13","done":true},{"plannedAt":"2025-05-14","done":true},{"plannedAt":"2025-05-16","done":true},{"plannedAt":"2025-05-19","done":true}]	2025-05-19
147	2025-05-27 22:36:03.145876	2025-06-02 16:01:01.825	269. Alien Dictionary	1	https://neetcode.io/problems/foreign-dictionary	\N	2025-05-27	\N	[{"plannedAt":"2025-05-27","done":true},{"plannedAt":"2025-05-28","done":true},{"plannedAt":"2025-05-30","done":true},{"plannedAt":"2025-06-02","done":true}]	2025-06-02
139	2025-05-19 17:22:46.872116	2025-05-26 05:51:50.485	297. Serialize and Deserialize Binary Tree	1	https://leetcode.com/problems/serialize-and-deserialize-binary-tree/	\N	2025-05-19	\N	[{"plannedAt":"2025-05-19","done":true},{"plannedAt":"2025-05-20","done":true},{"plannedAt":"2025-05-22","done":true},{"plannedAt":"2025-05-25","done":true}]	2025-05-25
141	2025-05-23 02:46:53.624838	2025-05-28 17:39:43.54	51. N-Queens	1	https://leetcode.com/problems/n-queens/	\N	2025-05-22	\N	[{"plannedAt":"2025-05-22","done":true},{"plannedAt":"2025-05-23","done":true},{"plannedAt":"2025-05-25","done":true},{"plannedAt":"2025-05-28","done":true}]	2025-05-28
144	2025-05-25 05:22:35.505353	2025-05-30 16:31:37.982	1851. Minimum Interval to Include Each Query	1	https://leetcode.com/problems/minimum-interval-to-include-each-query/	\N	2025-05-24	\N	[{"plannedAt":"2025-05-24","done":true},{"plannedAt":"2025-05-25","done":true},{"plannedAt":"2025-05-27","done":true},{"plannedAt":"2025-05-30","done":true}]	2025-05-30
140	2025-05-22 00:51:50.995614	2025-06-02 19:51:23.983	212. Word Search II	1	https://leetcode.com/problems/word-search-ii/	\N	2025-05-21	\N	[{"plannedAt":"2025-05-21","done":true},{"plannedAt":"2025-05-22","done":true},{"plannedAt":"2025-05-24","done":true},{"plannedAt":"2025-05-27","done":true},{"plannedAt":"2025-06-02","done":true}]	2025-06-02
145	2025-05-26 05:28:19.613598	2025-06-09 03:14:42.693	332. Reconstruct Itinerary	1	https://leetcode.com/problems/reconstruct-itinerary/	\N	2025-05-25	\N	[{"plannedAt":"2025-05-25","done":true},{"plannedAt":"2025-05-26","done":true},{"plannedAt":"2025-05-28","done":true},{"plannedAt":"2025-05-31","done":true},{"plannedAt":"2025-06-08","done":true}]	2025-06-08
142	2025-05-23 17:32:49.351813	2025-05-29 15:05:16.649	295. Find Median from Data Stream	1	https://leetcode.com/problems/find-median-from-data-stream/	\N	2025-05-23	\N	[{"plannedAt":"2025-05-23","done":true},{"plannedAt":"2025-05-24","done":true},{"plannedAt":"2025-05-26","done":true},{"plannedAt":"2025-05-29","done":true}]	2025-05-29
157	2025-06-03 22:17:35.170592	2025-06-11 14:36:50.453	50. Pow(x, n)	1	https://leetcode.com/problems/powx-n/	\N	2025-06-03	\N	[{"plannedAt":"2025-06-03","done":true},{"plannedAt":"2025-06-04","done":true},{"plannedAt":"2025-06-08","done":true},{"plannedAt":"2025-06-11","done":true}]	2025-06-11
156	2025-06-03 21:48:27.065698	2025-06-11 14:40:59.528	66. Plus One	1	https://leetcode.com/problems/plus-one/	\N	2025-06-03	\N	[{"plannedAt":"2025-06-03","done":true},{"plannedAt":"2025-06-04","done":true},{"plannedAt":"2025-06-08","done":true},{"plannedAt":"2025-06-11","done":true}]	2025-06-11
158	2025-06-04 17:42:13.198425	2025-06-11 14:59:39.608	43. Multiply Strings	1	https://leetcode.com/problems/multiply-strings/	\N	2025-06-04	\N	[{"plannedAt":"2025-06-04","done":true},{"plannedAt":"2025-06-05","done":true},{"plannedAt":"2025-06-08","done":true},{"plannedAt":"2025-06-11","done":true}]	2025-06-11
160	2025-06-09 01:22:01.625214	2025-06-11 17:08:11.186	863. All Nodes Distance K in Binary Tree	3	https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/	\N	2025-06-08	2025-06-14	[{"plannedAt":"2025-06-08","done":true},{"plannedAt":"2025-06-09","done":true},{"plannedAt":"2025-06-11","done":true},{"plannedAt":"2025-06-14","done":false}]	2025-06-14
151	2025-05-31 15:53:51.177332	2025-06-09 02:38:47.603	10. Regular Expression Matching	1	https://leetcode.com/problems/regular-expression-matching/	\N	2025-05-31	\N	[{"plannedAt":"2025-05-31","done":true},{"plannedAt":"2025-06-01","done":true},{"plannedAt":"2025-06-03","done":true},{"plannedAt":"2025-06-08","done":true}]	2025-06-08
150	2025-05-30 17:30:15.210289	2025-06-05 16:59:42.019	312. Burst Balloons	1	https://leetcode.com/problems/burst-balloons/	\N	2025-05-30	\N	[{"plannedAt":"2025-05-30","done":true},{"plannedAt":"2025-05-31","done":true},{"plannedAt":"2025-06-02","done":true},{"plannedAt":"2025-06-05","done":true}]	2025-06-05
152	2025-06-01 17:59:08.934979	2025-06-09 03:17:08.399	48. Rotate Image	1	https://leetcode.com/problems/rotate-image/	\N	2025-06-01	\N	[{"plannedAt":"2025-06-01","done":true},{"plannedAt":"2025-06-02","done":true},{"plannedAt":"2025-06-04","done":true},{"plannedAt":"2025-06-08","done":true}]	2025-06-08
153	2025-06-01 18:17:09.804246	2025-06-09 03:21:58.951	54. Spiral Matrix	1	https://leetcode.com/problems/spiral-matrix/	\N	2025-06-01	\N	[{"plannedAt":"2025-06-01","done":true},{"plannedAt":"2025-06-02","done":true},{"plannedAt":"2025-06-04","done":true},{"plannedAt":"2025-06-08","done":true}]	2025-06-08
165	2025-06-12 20:24:28.676846	2025-06-12 20:24:28.676846	2386. Find the K-Sum of an Array	3	https://leetcode.com/problems/find-the-k-sum-of-an-array/	\N	2025-06-12	2025-06-13	[{"plannedAt":"2025-06-12","done":true},{"plannedAt":"2025-06-13","done":false},{"plannedAt":"2025-06-15","done":false},{"plannedAt":"2025-06-18","done":false}]	2025-06-18
149	2025-05-30 00:46:10.552439	2025-06-04 15:35:48.105	115. Distinct Subsequences	1	https://leetcode.com/problems/distinct-subsequences/	\N	2025-05-29	\N	[{"plannedAt":"2025-05-29","done":true},{"plannedAt":"2025-05-30","done":true},{"plannedAt":"2025-06-01","done":true},{"plannedAt":"2025-06-04","done":true}]	2025-06-04
143	2025-05-23 19:40:30.838756	2025-06-05 17:21:29.868	127. Word Ladder	1	https://leetcode.com/problems/word-ladder/	\N	2025-05-23	\N	[{"plannedAt":"2025-05-23","done":true},{"plannedAt":"2025-05-24","done":true},{"plannedAt":"2025-05-26","done":true},{"plannedAt":"2025-05-29","done":true},{"plannedAt":"2025-06-05","done":true}]	2025-06-05
161	2025-06-11 15:02:41.161121	2025-06-11 16:45:48.572	2398. Maximum Number of Robots Within Budget	3	https://leetcode.com/problems/maximum-number-of-robots-within-budget/?envType=problem-list-v2&envId=7p5x763	\N	2025-06-10	2025-06-13	[{"plannedAt":"2025-06-10","done":true},{"plannedAt":"2025-06-11","done":true},{"plannedAt":"2025-06-13","done":false},{"plannedAt":"2025-06-16","done":false}]	2025-06-16
162	2025-06-11 15:03:21.956728	2025-06-11 16:52:08.004	2222. Number of Ways to Select Buildings	3	https://leetcode.com/problems/number-of-ways-to-select-buildings/?envType=problem-list-v2&envId=7p5x763	\N	2025-06-10	2025-06-13	[{"plannedAt":"2025-06-10","done":true},{"plannedAt":"2025-06-11","done":true},{"plannedAt":"2025-06-13","done":false},{"plannedAt":"2025-06-16","done":false}]	2025-06-16
164	2025-06-11 20:29:43.272561	2025-06-12 17:03:20.369	2100. Find Good Days to Rob the Bank	3	https://leetcode.com/problems/find-good-days-to-rob-the-bank/	\N	2025-06-11	2025-06-14	[{"plannedAt":"2025-06-11","done":true},{"plannedAt":"2025-06-12","done":true},{"plannedAt":"2025-06-14","done":false},{"plannedAt":"2025-06-17","done":false}]	2025-06-17
154	2025-06-02 20:20:12.727129	2025-06-09 03:33:37.202	73. Set Matrix Zeroes	1	https://leetcode.com/problems/set-matrix-zeroes/	\N	2025-06-02	\N	[{"plannedAt":"2025-06-02","done":true},{"plannedAt":"2025-06-03","done":true},{"plannedAt":"2025-06-05","done":true},{"plannedAt":"2025-06-08","done":true}]	2025-06-08
155	2025-06-02 20:20:19.679631	2025-06-09 03:36:12.309	202. Happy Number	1	https://leetcode.com/problems/happy-number/	\N	2025-06-02	\N	[{"plannedAt":"2025-06-02","done":true},{"plannedAt":"2025-06-03","done":true},{"plannedAt":"2025-06-05","done":true},{"plannedAt":"2025-06-08","done":true}]	2025-06-08
159	2025-06-05 20:17:06.395154	2025-06-11 14:31:06.623	2013. Detect Squares	1	https://leetcode.com/problems/detect-squares/	\N	2025-06-05	2025-06-13	[{"plannedAt":"2025-06-05","done":true},{"plannedAt":"2025-06-08","done":true},{"plannedAt":"2025-06-10","done":true},{"plannedAt":"2025-06-13","done":false}]	2025-06-13
163	2025-06-11 17:48:19.23393	2025-06-12 17:33:51.51	1567. Maximum Length of Subarray With Positive Product	3	https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/	\N	2025-06-11	2025-06-14	[{"plannedAt":"2025-06-11","done":true},{"plannedAt":"2025-06-12","done":true},{"plannedAt":"2025-06-14","done":false},{"plannedAt":"2025-06-17","done":false}]	2025-06-17
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, created_at, updated_at, email, name) FROM stdin;
520027f0ddc7ec50894e4f051574c61a77e04a69cc992bf8f3e4ca3437430464	2025-01-12 12:31:39.442407	2025-01-12 12:31:39.442407	junyi.wang.007@gmail.com	jy
\.


--
-- Name: project_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_id_seq', 3, true);


--
-- Name: task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_id_seq', 165, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- Name: project project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_pkey PRIMARY KEY (id);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (id);


--
-- Name: user user_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_unique UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: project project_owner_id_user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project
    ADD CONSTRAINT project_owner_id_user_id_fk FOREIGN KEY (owner_id) REFERENCES public."user"(id) NOT VALID;


--
-- Name: task task_project_id_project_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_project_id_project_id_fk FOREIGN KEY (project_id) REFERENCES public.project(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

