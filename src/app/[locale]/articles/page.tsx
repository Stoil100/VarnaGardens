"use client";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ArticleT } from "@/models/article";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../firebase/firebase.config";
import LogoTextImage from "@/components/LogoText";
import { Facebook, Instagram, Youtube } from "lucide-react";

const Article: React.FC<ArticleT> = ({ ...article }) => (
    <Link
        href={`articles/${article.id}`}
        className={cn(
            "group relative col-span-1 row-span-1 flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl text-white",
            article.type === "important" && "sm:col-span-2 sm:row-span-2",
            article.type === "notable" && "sm:col-span-2",
        )}
    >
        <img
            src={article.heroImage}
            alt={article.title}
            className="h-full w-full transform object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />
        <div className="absolute top-2 flex w-full justify-between px-2">
            <h4 className="text-xl font-extralight">{article.date}</h4>
        </div>
        <div className="absolute bottom-2 left-2 space-y-4">
            <h2
                className={cn(
                    article.type === "important" ? "text-5xl" : "text-4xl",
                )}
            >
                {article.title}
            </h2>
            {article.type === "important" && (
                <p className="text-lg font-extralight">
                    {article.titleDescriptions![0].value}
                </p>
            )}
        </div>
    </Link>
);

export default function Articles() {
    const [articles, setArticles] = useState<ArticleT[]>([]);
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesCollection = collection(db, "articles");
                const articleSnapshot = await getDocs(articlesCollection);
                const articlesList: ArticleT[] = articleSnapshot.docs.map(
                    (doc) =>
                        ({
                            id: doc.id,
                            ...doc.data(),
                        }) as ArticleT,
                );
                setArticles(articlesList);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, []);

    const columns = 4;
    const occupiedCells = articles.reduce((total, article) => {
        if (article.type === "important") return total + 4;
        if (article.type === "notable") return total + 2;
        return total + 1;
    }, 0);
    const totalRows = Math.ceil(occupiedCells / columns);
    const totalCells = totalRows * columns;
    const emptyCells = totalCells - occupiedCells;
    const gardeningQuotes = [
        {
            text: "To plant a garden is to believe in tomorrow.",
            author: "Audrey Hepburn",
        },
        {
            text: "Gardens are not made by singing 'Oh, how beautiful,' and sitting in the shade.",
            author: "Rudyard Kipling",
        },
        {
            text: "The love of gardening is a seed once sown that never dies.",
            author: "Gertrude Jekyll",
        },
        {
            text: "A garden is a grand teacher. It teaches patience and careful watchfulness.",
            author: "Gertrude Jekyll",
        },
        {
            text: "Life begins the day you start a garden.",
            author: "Chinese Proverb",
        },
        {
            text: "The garden suggests there might be a place where we can meet nature halfway.",
            author: "Michael Pollan",
        },
        {
            text: "If you have a garden and a library, you have everything you need.",
            author: "Cicero",
        },
        {
            text: "Flowers always make people better, happier, and more helpful.",
            author: "Luther Burbank",
        },
        {
            text: "Gardening is the purest of human pleasures.",
            author: "Francis Bacon",
        },
        {
            text: "A society grows great when old men plant trees whose shade they know they shall never sit in.",
            author: "Greek Proverb",
        },
        {
            text: "The best time to plant a tree was 20 years ago. The second-best time is now.",
            author: "Chinese Proverb",
        },
        {
            text: "We come from the earth, we return to the earth, and in between, we garden.",
            author: "Unknown",
        },
        {
            text: "Gardening is a work of a lifetime: you never finish.",
            author: "Oscar de la Renta",
        },
        {
            text: "In every gardener, there is a child who believes in The Seed Fairy.",
            author: "Robert Brault",
        },
        {
            text: "The garden is a friend you can visit anytime.",
            author: "Unknown",
        },
        {
            text: "Plants give us oxygen for the lungs and for the soul.",
            author: "Linda Solegato",
        },
        {
            text: "The glory of gardening: hands in the dirt, head in the sun, heart with nature.",
            author: "Alfred Austin",
        },
        {
            text: "A weed is but an unloved flower.",
            author: "Ella Wheeler Wilcox",
        },
        {
            text: "Flowers are the music of the ground from earth's lips spoken without sound.",
            author: "Edwin Curran",
        },
        { text: "Grow where you are planted.", author: "Unknown" },
        { text: "The earth laughs in flowers.", author: "Ralph Waldo Emerson" },
        {
            text: "A garden must combine the poetic and the mysterious with a feeling of serenity and joy.",
            author: "Luis Barragan",
        },
        {
            text: "There are no gardening mistakes, only experiments.",
            author: "Janet Kilburn Phillips",
        },
        {
            text: "An hour in the garden puts life's problems into perspective.",
            author: "Unknown",
        },
        {
            text: "Gardening adds years to your life and life to your years.",
            author: "Unknown",
        },
        {
            text: "A flower does not think of competing with the flower next to it. It just blooms.",
            author: "Zen Shin",
        },
        {
            text: "Every flower is a soul blossoming in nature.",
            author: "Gerard de Nerval",
        },
        {
            text: "Garden as though you will live forever.",
            author: "William Kent",
        },
        {
            text: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
            author: "Robert Louis Stevenson",
        },
        {
            text: "In the spring, at the end of the day, you should smell like dirt.",
            author: "Margaret Atwood",
        },
        {
            text: "The seeds of resilience are planted in the soil of time and care.",
            author: "Unknown",
        },
        {
            text: "Gardens are a form of autobiography.",
            author: "Sydney Eddison",
        },
        {
            text: "A gardener learns more in the mistakes than in the successes.",
            author: "Unknown",
        },
        {
            text: "Nature does not hurry, yet everything is accomplished.",
            author: "Lao Tzu",
        },
        { text: "A flower blossoms for its own joy.", author: "Oscar Wilde" },
        { text: "Good things grow with love and care.", author: "Unknown" },
        {
            text: "Gardens are the result of a collaboration between art and nature.",
            author: "Penelope Hobhouse",
        },
        {
            text: "Plant dreams, pull weeds, and grow a happy life.",
            author: "Unknown",
        },
        {
            text: "To nurture a garden is to feed not just the body, but the soul.",
            author: "Alfred Austin",
        },
        {
            text: "The hum of bees is the voice of the garden.",
            author: "Elizabeth Lawrence",
        },
        {
            text: "Gardening is how I relax. It’s another form of creating and playing with colors.",
            author: "Oscar de la Renta",
        },
        {
            text: "A tree is our most intimate contact with nature.",
            author: "George Nakashima",
        },
        {
            text: "The greatest fine art of the future will be the making of a comfortable living from a small piece of land.",
            author: "Abraham Lincoln",
        },
        {
            text: "All gardeners live in beautiful places because they make them so.",
            author: "Joseph Joubert",
        },
        {
            text: "Gardening simply does not allow one to be mentally old, because too many hopes and dreams are yet to be realized.",
            author: "Allan Armitage",
        },
        {
            text: "A garden is a love song, a duet between a human being and Mother Nature.",
            author: "Jeff Cox",
        },
    ];
    function getRandomGardeningQuote() {
        const randomIndex = Math.floor(Math.random() * gardeningQuotes.length);
        return gardeningQuotes[randomIndex];
    }

    const fillerOptions = [
        <div
            className="col-span-1 row-span-1 flex items-center justify-center rounded-2xl border-2 border-green bg-white text-center"
            key="filler-1"
        >
            <LogoTextImage />
        </div>,
        <div
            className="col-span-1 row-span-1 flex items-center justify-center gap-4 rounded-2xl border-8 border-double border-white bg-green text-center text-white"
            key="filler-2"
        >
            <Link
                href={"https://www.instagram.com/varnagardens/"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Instagram size={48} />
            </Link>
            <Link
                href={"https://www.youtube.com/@Varnagardens"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Youtube size={48} />
            </Link>
            <Link
                href={"https://www.facebook.com/varnagardens"}
                target="_blank"
                rel="noopener noreferrer"
            >
                <Facebook size={48} />
            </Link>
        </div>,
        <div
            className="col-span-1 row-span-1 flex items-center justify-center rounded-2xl border-2 border-green bg-white text-center text-green"
            key="filler-3"
        >
            <span className="font-cormorant text-6xl">Varna Gardens</span>
        </div>,
        <div
            className="col-span-1 row-span-1 flex flex-col items-center justify-center rounded-2xl border-8 border-double border-white bg-green p-2 text-center text-white"
            key="filler-4"
        >
            <span className="font-cormorant text-2xl font-light">
                &quot;{getRandomGardeningQuote().text}&quot;
            </span>
            {getRandomGardeningQuote().author && (
                <span className="mt-2 block text-sm">
                    - {getRandomGardeningQuote().author}
                </span>
            )}
        </div>,
        // <div
        //     className="col-span-1 row-span-1 flex items-center justify-center rounded-2xl bg-yellow-500 text-center"
        //     key="filler-5"
        // >
        //     <span className="text-lg font-bold">Advertisement</span>
        // </div>,
    ];

    const fillers = Array.from({ length: emptyCells }, (_, index) => {
        const randomFiller =
            fillerOptions[Math.floor(Math.random() * fillerOptions.length)];
        return React.cloneElement(randomFiller, { key: `filler-${index}` });
    });
    return (
        <section className="min-h-screen p-3 md:p-8">
            <div className="grid grid-flow-dense grid-cols-4 gap-3 md:auto-cols-[calc(33vw-2rem)] md:auto-rows-[calc(33vw-2rem)] lg:auto-cols-[calc(25vw-2rem)] lg:auto-rows-[calc(25vw-2rem)]">
                {articles.map((article) => (
                    <Article key={article.id} {...article} />
                ))}
                {fillers}
            </div>
        </section>
    );
}
