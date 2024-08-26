import { GoogleGenerativeAI } from "@google/generative-ai";

import Carousel from "./Carousel";

import { useRef, useState } from "react";

import { GEMINI_KEY } from "../utils/constants";

const RecommendationContainer = () => {
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const searchQuery = useRef(null);
  const [displayItemsArray, setDisplayItemsArray] = useState([]);

  const showSuggestions = async () => {
    const finalPrompt = `Suggest names of movies that match the query: ${searchQuery.current.value}. Return Strings as comma seperated values, where each entry is a movie name. Example: "Movie1Name, Movie2Name, Movie3Name,Movie4Name, Movie5Name". Only send the response and nothing else.`;

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;    
    const text = response.text();

    
    // setDisplayItemsArray([
    //   [
    //     {
    //       adult: false,
    //       backdrop_path: "/1wP1phHo2CROOqzv7Azs0MT5esU.jpg",
    //       genre_ids: [16, 35, 10751, 12, 28],
    //       id: 748783,
    //       original_language: "en",
    //       original_title: "The Garfield Movie",
    //       overview:
    //         "Garfield, the world-famous, Monday-hating, lasagna-loving indoor cat, is about to have a wild outdoor adventure! After an unexpected reunion with his long-lost father – scruffy street cat Vic – Garfield and his canine friend Odie are forced from their perfectly pampered life into joining Vic in a hilarious, high-stakes heist.",
    //       popularity: 984.396,
    //       poster_path: "/xYduFGuch9OwbCOEUiamml18ZoB.jpg",
    //       release_date: "2024-04-30",
    //       title: "The Garfield Movie",
    //       video: false,
    //       vote_average: 7.2,
    //       vote_count: 818,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/2KGxQFV9Wp1MshPBf8BuqWUgVAz.jpg",
    //       genre_ids: [16, 28, 12, 35, 10751],
    //       id: 940551,
    //       original_language: "en",
    //       original_title: "Migration",
    //       overview:
    //         "After a migrating duck family alights on their pond with thrilling tales of far-flung places, the Mallard family embarks on a family road trip, from New England, to New York City, to tropical Jamaica.",
    //       popularity: 342.032,
    //       poster_path: "/ldfCF9RhR40mppkzmftxapaHeTo.jpg",
    //       release_date: "2023-12-06",
    //       title: "Migration",
    //       video: false,
    //       vote_average: 7.458,
    //       vote_count: 1650,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    //       genre_ids: [16, 28, 12, 878],
    //       id: 569094,
    //       original_language: "en",
    //       original_title: "Spider-Man: Across the Spider-Verse",
    //       overview:
    //         "After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.",
    //       popularity: 258.123,
    //       poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    //       release_date: "2023-05-31",
    //       title: "Spider-Man: Across the Spider-Verse",
    //       video: false,
    //       vote_average: 8.356,
    //       vote_count: 6684,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/7ks7A3mAO7twDOvBVE4cR8LaIM8.jpg",
    //       genre_ids: [16, 28, 18],
    //       id: 1104844,
    //       original_language: "ja",
    //       original_title: "劇場版ブルーロック -EPISODE 凪-",
    //       overview:
    //         "One day, Nagi Seishiro receives an invitation to the mysterious BLUE LOCK Project. What awaits him there is an encounter with the finest strikers assembled from across the country. Nagi's dream of becoming the best, alongside Mikage Reo, will take this prodigy to a world he's never known.",
    //       popularity: 296.782,
    //       poster_path: "/ae434jM5NG2kKX1rRkG5giMhpPI.jpg",
    //       release_date: "2024-04-19",
    //       title: "BLUE LOCK THE MOVIE -EPISODE NAGI-",
    //       video: false,
    //       vote_average: 8.422,
    //       vote_count: 32,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/lgkPzcOSnTvjeMnuFzozRO5HHw1.jpg",
    //       genre_ids: [16, 10751, 35, 28],
    //       id: 519182,
    //       original_language: "en",
    //       original_title: "Despicable Me 4",
    //       overview:
    //         "Gru and Lucy and their girls—Margo, Edith and Agnes—welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Gru also faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    //       popularity: 2384.852,
    //       poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    //       release_date: "2024-06-20",
    //       title: "Despicable Me 4",
    //       video: false,
    //       vote_average: 7.297,
    //       vote_count: 1207,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/dsGwCEO8tda4FlgHKvL95f0oQbH.jpg",
    //       genre_ids: [16, 878, 28],
    //       id: 1209290,
    //       original_language: "en",
    //       original_title:
    //         "Justice League: Crisis on Infinite Earths Part Three",
    //       overview:
    //         "Now fully revealed as the ultimate threat to existence, the Anti-Monitor wages an unrelenting attack on the surviving Earths that struggle for survival in a pocket universe. One by one, these worlds and all their inhabitants are vaporized! On the planets that remain, even time itself is shattered, and heroes from the past join the Justice League and their rag-tag allies against the epitome of evil. But as they make their last stand, will the sacrifice of the superheroes be enough to save us all?",
    //       popularity: 461.014,
    //       poster_path: "/a3q8NkM8uTh9E23VsbUOdDSbBeN.jpg",
    //       release_date: "2024-07-15",
    //       title: "Justice League: Crisis on Infinite Earths Part Three",
    //       video: false,
    //       vote_average: 7.443,
    //       vote_count: 167,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg",
    //       genre_ids: [16, 10751, 12, 18, 35],
    //       id: 150540,
    //       original_language: "en",
    //       original_title: "Inside Out",
    //       overview:
    //         "When 11-year-old Riley moves to a new city, her Emotions team up to help her through the transition. Joy, Fear, Anger, Disgust and Sadness work together, but when Joy and Sadness get lost, they must journey through unfamiliar places to get back home.",
    //       popularity: 395.465,
    //       poster_path: "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    //       release_date: "2015-06-17",
    //       title: "Inside Out",
    //       video: false,
    //       vote_average: 7.914,
    //       vote_count: 21501,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/4z88bpDf7aqZcYkLDDEIdj8TfZU.jpg",
    //       genre_ids: [16, 10751, 14, 28],
    //       id: 1011985,
    //       original_language: "en",
    //       original_title: "Kung Fu Panda 4",
    //       overview:
    //         "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
    //       popularity: 497.217,
    //       poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    //       release_date: "2024-03-02",
    //       title: "Kung Fu Panda 4",
    //       video: false,
    //       vote_average: 7.119,
    //       vote_count: 2440,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/2MJIfQDA9orY3uVSnzExogbdhH6.jpg",
    //       genre_ids: [16, 35, 12, 10751],
    //       id: 831815,
    //       original_language: "en",
    //       original_title: "Saving Bikini Bottom: The Sandy Cheeks Movie",
    //       overview:
    //         "When Bikini Bottom is scooped from the ocean, scientific squirrel Sandy Cheeks and her pal SpongeBob SquarePants saddle up for Texas to save their town.",
    //       popularity: 1078.13,
    //       poster_path: "/30YnfZdMNIV7noWLdvmcJS0cbnQ.jpg",
    //       release_date: "2024-08-01",
    //       title: "Saving Bikini Bottom: The Sandy Cheeks Movie",
    //       video: false,
    //       vote_average: 6.389,
    //       vote_count: 166,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/4z88bpDf7aqZcYkLDDEIdj8TfZU.jpg",
    //       genre_ids: [16, 10751, 14, 28],
    //       id: 1011985,
    //       original_language: "en",
    //       original_title: "Kung Fu Panda 4",
    //       overview:
    //         "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
    //       popularity: 497.217,
    //       poster_path: "/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    //       release_date: "2024-03-02",
    //       title: "Kung Fu Panda 4",
    //       video: false,
    //       vote_average: 7.119,
    //       vote_count: 2440,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
    //       genre_ids: [16, 10751, 12, 35],
    //       id: 1022789,
    //       original_language: "en",
    //       original_title: "Inside Out 2",
    //       overview:
    //         "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
    //       popularity: 3128.461,
    //       poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    //       release_date: "2024-06-11",
    //       title: "Inside Out 2",
    //       video: false,
    //       vote_average: 7.677,
    //       vote_count: 2912,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/h9YlRHAZWOWtGonllmj6JJg1FrE.jpg",
    //       genre_ids: [28, 12, 16, 10751, 14],
    //       id: 588648,
    //       original_language: "zh",
    //       original_title: "Dragonkeeper",
    //       overview:
    //         "Set in Han Imperial China, the plot follows the adventures of enslaved girl Ping with ancient dragon Long Danzi. Dragons had been banished from the kingdom. Ping, an orphan, finds one of the last remaining dragon eggs. Palace guards force Ping to run away in order to return the dragon egg to the ocean and save all dragons from extinction. Ping discovers that she is a true Dragonkeeper.",
    //       popularity: 1063.45,
    //       poster_path: "/ggZGnJLzO3BTu7ysuuIzou3Oex5.jpg",
    //       release_date: "2024-04-11",
    //       title: "Dragonkeeper",
    //       video: false,
    //       vote_average: 7.372,
    //       vote_count: 46,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/hU1Q9YVzdYhokr8a9gLywnSUMlN.jpg",
    //       genre_ids: [16, 12, 28, 14, 10751],
    //       id: 1147400,
    //       original_language: "fr",
    //       original_title:
    //         "Miraculous World : Paris, Les Aventures de Toxinelle et Griffe Noire",
    //       overview:
    //         "Miraculous holders from another world appear in Paris. They come from a parallel universe where everything is reversed: the holders of Ladybug and Black Cat Miraculouses, Shadybug and Claw Noir, are the bad guys, and the holder of the Butterfly Miraculous, Hesperia, is a superhero. Ladybug and Cat Noir will have to help Hesperia counter the attacks of their evil doubles and prevent them from seizing the Butterfly's Miraculous. Can our heroes also help Hesperia make Shadybug and Claw Noir better people?",
    //       popularity: 323.198,
    //       poster_path: "/7Md3nuV0ZprBTnkdR3OrUCEsrSP.jpg",
    //       release_date: "2023-10-21",
    //       title: "Miraculous World: Paris, Tales of Shadybug and Claw Noir",
    //       video: false,
    //       vote_average: 7.363,
    //       vote_count: 390,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/hofnlIyF6bePkgQOpcuRWLvzf15.jpg",
    //       genre_ids: [16, 10751, 14],
    //       id: 14836,
    //       original_language: "en",
    //       original_title: "Coraline",
    //       overview:
    //         "Wandering her rambling old house in her boring new town, 11-year-old Coraline discovers a hidden door to a strangely idealized version of her life. In order to stay in the fantasy, she must make a frighteningly real sacrifice.",
    //       popularity: 417.869,
    //       poster_path: "/4jeFXQYytChdZYE9JYO7Un87IlW.jpg",
    //       release_date: "2009-02-05",
    //       title: "Coraline",
    //       video: false,
    //       vote_average: 7.881,
    //       vote_count: 7766,
    //     },
    //   ],
    //   [
    //     {
    //       adult: false,
    //       backdrop_path: "/zRXJARKQZk6NleofIEyWcBt1fGk.jpg",
    //       genre_ids: [27, 14, 18],
    //       id: 852432,
    //       original_language: "fr",
    //       original_title: "La Tour",
    //       overview:
    //         "In the heart of a city, the inhabitants of a tower wake up one morning to find that their building is shrouded in an opaque fog, obstructing doors and windows - a strange dark matter that devours anything that tries to pass through it. Trapped, the residents try to organize themselves, but to ensure their survival they gradually succumb to their most primitive instincts, until they sink into horror...",
    //       popularity: 429.611,
    //       poster_path: "/9wcvKsdNs5eImAYFD4b12d0fSs9.jpg",
    //       release_date: "2023-02-08",
    //       title: "The Tower",
    //       video: false,
    //       vote_average: 4.517,
    //       vote_count: 86,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/seAIZLEq2Il2psjMUREDbSdRmbu.jpg",
    //       genre_ids: [18, 28, 14, 878],
    //       id: 801688,
    //       original_language: "te",
    //       original_title: "కల్కి 2898-ఎ.డి",
    //       overview:
    //         "In the year 2898 AD, around 6000 years after Kurukshetra war, Ashwatthama gears up for his final battle of redemption at the sign of hope in a dystopian world and Bhairava, a wisecracking and self-interested bounty hunter, tired of the perilous life becomes the hurdle in the process.",
    //       popularity: 222.009,
    //       poster_path: "/zNE88KjSX2nDSWjdsNqeIFGAXo8.jpg",
    //       release_date: "2024-06-26",
    //       title: "Kalki 2898-AD",
    //       video: false,
    //       vote_average: 6.581,
    //       vote_count: 43,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/aswBReNN2adqTiOBnvh96RCDeJP.jpg",
    //       genre_ids: [28, 80, 18],
    //       id: 959092,
    //       original_language: "fr",
    //       original_title: "Farang",
    //       overview:
    //         "Sam is a professional boxer about to get released from prison. While on parole, his past catches up with him and he has no choice but to flee. Five years later, he has rebuilt a simple life on an exotic island in Thailand with his wife and her daughter, but when he gets blackmailed by a dangerous local godfather, he must embark on a dangerous drug smuggling mission which results in a tragedy. Now has only one purpose: to seek merciless vengeance.",
    //       popularity: 965.241,
    //       poster_path: "/u9035lysUz3ccloQt0SeIp1Mu8a.jpg",
    //       release_date: "2023-06-28",
    //       title: "Mayhem!",
    //       video: false,
    //       vote_average: 6.752,
    //       vote_count: 127,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
    //       genre_ids: [10752, 28, 18],
    //       id: 929590,
    //       original_language: "en",
    //       original_title: "Civil War",
    //       overview:
    //         "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
    //       popularity: 538.303,
    //       poster_path: "/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg",
    //       release_date: "2024-04-10",
    //       title: "Civil War",
    //       video: false,
    //       vote_average: 7,
    //       vote_count: 2212,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/fuv2TxJb1retWu3XMwsVJqm8ylr.jpg",
    //       genre_ids: [18],
    //       id: 1037035,
    //       original_language: "en",
    //       original_title: "Janet Planet",
    //       overview:
    //         "In rural Western Massachusetts, 11-year-old Lacy spends the summer of 1991 at home, enthralled by her own imagination and the attention of her mother, Janet. As the months pass, three visitors enter their orbit, all captivated by Janet.",
    //       popularity: 156.305,
    //       poster_path: "/wBzsGjJR4b3K3v3fY7jeu0wiTod.jpg",
    //       release_date: "2024-06-21",
    //       title: "Janet Planet",
    //       video: false,
    //       vote_average: 6.2,
    //       vote_count: 14,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/6vq5wXubxQnXqOeLxAwZrfpAwTG.jpg",
    //       genre_ids: [27, 18, 53],
    //       id: 1300962,
    //       original_language: "en",
    //       original_title: "The Beast Within",
    //       overview:
    //         "Ten-year-old Willow follows her parents on one of their secret late-night treks to the heart of an ancient forest. After witnessing her father undergo a terrible transformation, she too becomes ensnared by the dark ancestral secret that they've so desperately tried to conceal.",
    //       popularity: 415.683,
    //       poster_path: "/5RvNjlDufqUBH3iHBPb1cS53wXl.jpg",
    //       release_date: "2024-07-22",
    //       title: "The Beast Within",
    //       video: false,
    //       vote_average: 5.9,
    //       vote_count: 26,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    //       genre_ids: [18, 80],
    //       id: 238,
    //       original_language: "en",
    //       original_title: "The Godfather",
    //       overview:
    //         "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    //       popularity: 290.926,
    //       poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    //       release_date: "1972-03-14",
    //       title: "The Godfather",
    //       video: false,
    //       vote_average: 8.69,
    //       vote_count: 20245,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/iafs5DG5fGq7ef0acl3xlX4BFrs.jpg",
    //       genre_ids: [18, 10770],
    //       id: 1219685,
    //       original_language: "fr",
    //       original_title: "Un père idéal",
    //       overview:
    //         "Michel, the jovial owner of the only café in a small Normandy town, sees his life turned upside down when his teenage daughter is murdered. The community has his back but soon rumor spreads and Michel is singled out. From the ideal father, he becomes the ideal culprit.",
    //       popularity: 470.761,
    //       poster_path: "/4xJd3uwtL1vCuZgEfEc8JXI9Uyx.jpg",
    //       release_date: "2024-04-21",
    //       title: "An Ideal Father",
    //       video: false,
    //       vote_average: 6.6,
    //       vote_count: 80,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/58D6ZAvOKxlHjyX9S8qNKSBE9Y.jpg",
    //       genre_ids: [28, 12, 18, 53],
    //       id: 718821,
    //       original_language: "en",
    //       original_title: "Twisters",
    //       overview:
    //         "As storm season intensifies, the paths of former storm chaser Kate Carter and reckless social-media superstar Tyler Owens collide when terrifying phenomena never seen before are unleashed. The pair and their competing teams find themselves squarely in the paths of multiple storm systems converging over central Oklahoma in the fight of their lives.",
    //       popularity: 2251.448,
    //       poster_path: "/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    //       release_date: "2024-07-10",
    //       title: "Twisters",
    //       video: false,
    //       vote_average: 7.038,
    //       vote_count: 1030,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/y0LhmaMYpFkIfrUlOpJYTVMH2eA.jpg",
    //       genre_ids: [18],
    //       id: 592695,
    //       original_language: "sv",
    //       original_title: "Pleasure",
    //       overview:
    //         "19 year old Linnéa leaves her small town in Sweden and heads for Los Angeles with the aim of becoming the world's next big porn star, but the road to her goal turns out to be bumpier than she imagined.",
    //       popularity: 272.951,
    //       poster_path: "/TcOsu6iO5prSJbDn9oIQgIW655.jpg",
    //       release_date: "2021-10-08",
    //       title: "Pleasure",
    //       video: false,
    //       vote_average: 6.234,
    //       vote_count: 499,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/lntyt4OVDbcxA1l7LtwITbrD3FI.jpg",
    //       genre_ids: [18, 10749],
    //       id: 1010581,
    //       original_language: "es",
    //       original_title: "Culpa mía",
    //       overview:
    //         "Noah must leave her city, boyfriend, and friends to move into William Leister's mansion, the flashy and wealthy husband of her mother Rafaela. As a proud and independent 17 year old, Noah resists living in a mansion surrounded by luxury. However, it is there where she meets Nick, her new stepbrother, and the clash of their strong personalities becomes evident from the very beginning.",
    //       popularity: 425.526,
    //       poster_path: "/w46Vw536HwNnEzOa7J24YH9DPRS.jpg",
    //       release_date: "2023-06-08",
    //       title: "My Fault",
    //       video: false,
    //       vote_average: 7.951,
    //       vote_count: 2810,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/9BQqngPfwpeAfK7c2H3cwIFWIVR.jpg",
    //       genre_ids: [10749, 18],
    //       id: 1079091,
    //       original_language: "en",
    //       original_title: "It Ends with Us",
    //       overview:
    //         "Lily Bloom overcomes a traumatic childhood to embark on a new life in Boston and chase a lifelong dream of opening her own business. A chance meeting with charming neurosurgeon Ryle Kincaid sparks an intense connection, but as the two fall deeply in love, Lily begins to see sides of Ryle that remind her of her parents' relationship.",
    //       popularity: 1307.713,
    //       poster_path: "/AjV6jFJ2YFIluYo4GQf13AA1tqu.jpg",
    //       release_date: "2024-08-07",
    //       title: "It Ends with Us",
    //       video: false,
    //       vote_average: 7,
    //       vote_count: 160,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/3EIYw4aJImgsvJsb0ybhOzLk6J3.jpg",
    //       genre_ids: [28, 18],
    //       id: 1066262,
    //       original_language: "en",
    //       original_title: "The Convert",
    //       overview:
    //         "Munro, a soldier turned lay preacher, comes to New Zealand to minister to the first British colonists, but he is converted by the powerful chief Maianui to serve a different purpose.",
    //       popularity: 777.219,
    //       poster_path: "/e5ZqqPlhKstzB4geibpZh38w7Pq.jpg",
    //       release_date: "2024-03-14",
    //       title: "The Convert",
    //       video: false,
    //       vote_average: 6.3,
    //       vote_count: 48,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg",
    //       genre_ids: [16, 10751, 12, 18, 35],
    //       id: 150540,
    //       original_language: "en",
    //       original_title: "Inside Out",
    //       overview:
    //         "When 11-year-old Riley moves to a new city, her Emotions team up to help her through the transition. Joy, Fear, Anger, Disgust and Sadness work together, but when Joy and Sadness get lost, they must journey through unfamiliar places to get back home.",
    //       popularity: 395.465,
    //       poster_path: "/2H1TmgdfNtsKlU9jKdeNyYL5y8T.jpg",
    //       release_date: "2015-06-17",
    //       title: "Inside Out",
    //       video: false,
    //       vote_average: 7.914,
    //       vote_count: 21501,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/7ks7A3mAO7twDOvBVE4cR8LaIM8.jpg",
    //       genre_ids: [16, 28, 18],
    //       id: 1104844,
    //       original_language: "ja",
    //       original_title: "劇場版ブルーロック -EPISODE 凪-",
    //       overview:
    //         "One day, Nagi Seishiro receives an invitation to the mysterious BLUE LOCK Project. What awaits him there is an encounter with the finest strikers assembled from across the country. Nagi's dream of becoming the best, alongside Mikage Reo, will take this prodigy to a world he's never known.",
    //       popularity: 296.782,
    //       poster_path: "/ae434jM5NG2kKX1rRkG5giMhpPI.jpg",
    //       release_date: "2024-04-19",
    //       title: "BLUE LOCK THE MOVIE -EPISODE NAGI-",
    //       video: false,
    //       vote_average: 8.422,
    //       vote_count: 32,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/3bqfwYl2wZSHxLjnVaTgXoZKQ8M.jpg",
    //       genre_ids: [27, 28, 18],
    //       id: 1154864,
    //       original_language: "es",
    //       original_title: "Malditas",
    //       overview:
    //         "The lives of six girls belong to different worlds although connected to each other through a doll called Molly, whose existence dates back to 1976, when she appeared among the rubble of the great fire of the San Carlos orphanage, in northern Spain",
    //       popularity: 546.5,
    //       poster_path: "/nQlq8Dp0DiYbAmybZFwp2JvS2Ml.jpg",
    //       release_date: "2023-10-20",
    //       title: "Cursed",
    //       video: false,
    //       vote_average: 0,
    //       vote_count: 0,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/QflfyU07MiQXSqTUCmG9Xfq0Ws.jpg",
    //       genre_ids: [28, 18, 10749],
    //       id: 1281826,
    //       original_language: "en",
    //       original_title: "One Fast Move",
    //       overview:
    //         "A dishonorably discharged soldier seeks out his estranged father to help him pursue his dream of becoming a professional motorcycle racer. While training, he meets a small-town, aspiring singer and a motorcycle shop owner who begin to break down the walls his father's absence had built up.",
    //       popularity: 807.249,
    //       poster_path: "/hdBUjfbdr1ymS0kycAT7qguOmWA.jpg",
    //       release_date: "2024-08-07",
    //       title: "One Fast Move",
    //       video: false,
    //       vote_average: 6.835,
    //       vote_count: 97,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/6Vbm2nHxHMlZZ199fmZtMytpFvK.jpg",
    //       genre_ids: [28, 53, 35, 18],
    //       id: 1309923,
    //       original_language: "es",
    //       original_title: "No negociable",
    //       overview:
    //         "Hostage negotiator Alan Bender is called to rescue the president from a kidnapping, only to find himself also mediating to save his wife and marriage.",
    //       popularity: 465.232,
    //       poster_path: "/bHQG4UsLMFCy91gfLAFRpnCOPdP.jpg",
    //       release_date: "2024-07-25",
    //       title: "Non Negotiable",
    //       video: false,
    //       vote_average: 6.019,
    //       vote_count: 78,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/iqvwqusm7gNP26SxbmwHXOkYFFF.jpg",
    //       genre_ids: [18, 10749],
    //       id: 179387,
    //       original_language: "tl",
    //       original_title: "Heavenly Touch",
    //       overview:
    //         "Jonard is having trouble making ends meet. His mother is suffering from depression, and he and his sister are forced to quit school in order to take care of her. One day, Jonard meets up his friend Rodel, and Rodel introduces him to the world of massage parlors. Rodel teaches him massage, and brings him to Heavenly Touch, a syndicate-run massage parlor that mostly caters to homosexuals.",
    //       popularity: 761.723,
    //       poster_path: "/ory8WuAqznTE7lfopTSymHpop2t.jpg",
    //       release_date: "2009-05-12",
    //       title: "Heavenly Touch",
    //       video: false,
    //       vote_average: 5.3,
    //       vote_count: 10,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/iafs5DG5fGq7ef0acl3xlX4BFrs.jpg",
    //       genre_ids: [18, 10770],
    //       id: 1219685,
    //       original_language: "fr",
    //       original_title: "Un père idéal",
    //       overview:
    //         "Michel, the jovial owner of the only café in a small Normandy town, sees his life turned upside down when his teenage daughter is murdered. The community has his back but soon rumor spreads and Michel is singled out. From the ideal father, he becomes the ideal culprit.",
    //       popularity: 470.761,
    //       poster_path: "/4xJd3uwtL1vCuZgEfEc8JXI9Uyx.jpg",
    //       release_date: "2024-04-21",
    //       title: "An Ideal Father",
    //       video: false,
    //       vote_average: 6.6,
    //       vote_count: 80,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/7gCdtbqui8KqauL1gSmRrKg6Bin.jpg",
    //       genre_ids: [35, 18, 10749],
    //       id: 10660,
    //       original_language: "en",
    //       original_title: "It Could Happen to You",
    //       overview:
    //         "Charlie Lang is a simple, kindhearted New York City cop. When he realizes he has no money to tip waitress Yvonne Biasi, Lang offers her half the winnings of his lottery ticket. Amazingly, the ticket happens to be a winner, in the sum of $4 million. True to his word, Lang proceeds to share the prize money with Biasi, which infuriates his greedy wife, Muriel. Not content with the arrangement, Muriel begins scheming to take all the money.",
    //       popularity: 260.931,
    //       poster_path: "/6UOaeLDOdwwTMQtbl5YL6EGjqy0.jpg",
    //       release_date: "1994-07-29",
    //       title: "It Could Happen to You",
    //       video: false,
    //       vote_average: 6.553,
    //       vote_count: 741,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/iwkWvcXcP8M4r9HLglhVEhgGyVu.jpg",
    //       genre_ids: [28, 18, 27, 53],
    //       id: 1001311,
    //       original_language: "fr",
    //       original_title: "Sous la Seine",
    //       overview:
    //         "In order to save Paris from an international bloodbath, a grieving scientist is forced to face her tragic past when a giant shark appears in the Seine.",
    //       popularity: 299.409,
    //       poster_path: "/qZPLK5ktRKa3CL4sKRZtj8UlPYc.jpg",
    //       release_date: "2024-06-04",
    //       title: "Under Paris",
    //       video: false,
    //       vote_average: 6,
    //       vote_count: 1055,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/5r2NPZgYBB8ALBL3q4iX9AjTLJ6.jpg",
    //       genre_ids: [10749, 18],
    //       id: 1308821,
    //       original_language: "tl",
    //       original_title: "Unang Tikim",
    //       overview:
    //         "Yuna, a woman engaged with her long time boyfriend, Nicco, starts to have second thoughts when she meets again her first love, Becca. Now she is torn between the man she loves and the woman she first loved.",
    //       popularity: 212.307,
    //       poster_path: "/oDWZS6LznvdH7mZOYfCro0ISJCM.jpg",
    //       release_date: "2024-07-07",
    //       title: "Unang Tikim",
    //       video: false,
    //       vote_average: 1,
    //       vote_count: 1,
    //     },
    //     {
    //       adult: false,
    //       backdrop_path: "/wPNI1fd18z5TKBOK9Mv9Rfjb0j0.jpg",
    //       genre_ids: [53, 18, 28, 80],
    //       id: 729165,
    //       original_language: "en",
    //       original_title: "Out of Exile",
    //       overview:
    //         "Recently paroled thief Gabriel Russell tries to balance his life and mend a troubled family as an FBI agent hunts him down, along with his crew after a botched armored car robbery.",
    //       popularity: 356.549,
    //       poster_path: "/jgF5XaXnJmOgMxulhy2k1f9LNNc.jpg",
    //       release_date: "2023-01-20",
    //       title: "Out of Exile",
    //       video: false,
    //       vote_average: 6.306,
    //       vote_count: 36,
    //     },
    //   ],
    // ]);
  };

  return (
    <div className="w-full h-screen bg-black/30 backdrop-blur-lg pt-36 text-white">
      <form
        className="text-center "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          className="w-1/2 mr-2 p-3 rounded-md bg-gray-900"
          placeholder="What's Your Mood Today?"
          ref={searchQuery}
        />
        <button
          className="py-2 px-4 rounded-md bg-red-700"
          onClick={showSuggestions}
        >
          Search
        </button>
      </form>
      <div id="recommendation-result-carousels" className="px-8">
        {displayItemsArray.length > 0 &&
          displayItemsArray.map((displayItemsArrayElem) => (
            <Carousel
              carouselTitle="test"
              displayItems={displayItemsArrayElem}
              showNavigationBtns={false}
            />
          ))}
      </div>
    </div>
  );
};

export default RecommendationContainer;
