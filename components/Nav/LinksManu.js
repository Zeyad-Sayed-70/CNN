import Link from "next/link";
import { Col, Row, Container } from "react-bootstrap";
import styles from "./nav.module.css";

const linksData = [
  {
    title: "World",
    path: "world",
    lists: [
      "Africa",
      "Americas",
      "Asia",
      "Australia",
      "China",
      "Europe",
      "india",
      "Middle East",
      "United Kinkdom",
    ],
  },
  {
    title: "US Politics",
    path: "uspolitics",
    lists: ["The Biden Presidency", "Facts First", "US Elections"],
  },
  {
    title: "Business",
    path: "business",
    lists: ["Markets", "Tech", "Media", "Success", "Persepectives", "Videos"],
  },
  {
    title: "Health",
    path: "health",
    lists: [
      "Life, But Better",
      "Fitness",
      "Food",
      "Sleep",
      "Mindfulness",
      "Relationships",
    ],
  },
  {
    title: "Entertainment",
    path: "entertainment",
    lists: ["Stars", "Screen", "Binge", "Culture", "Media"],
  },
  {
    title: "Tech",
    path: "tech",
    lists: [
      "innovate",
      "Gadget",
      "Foreseeable Future",
      "Mission: Ahead",
      "Upstart",
      "Work Transformd",
      "Innovative Cities",
    ],
  },
  {
    title: "Style",
    path: "style",
    lists: [
      "Arts",
      "Design",
      "Fashion",
      "Architecture",
      "Luxury",
      "Beauty",
      "Video",
    ],
  },
];

export const LinksManu = () => {
  return (
    <div className={styles.links_menu}>
      <Container className="py-5">
        <Row className="">
          {linksData.map((ll) => {
            return (
              <Col className="col-6 col-md-4 col-lg-3 mb-3" key={ll.title}>
                <h5>{ll.title}</h5>
                <ul className="">
                  {ll.lists.map((list) => (
                    <li key={list} className={styles.list}>
                      <a href={`/${list}`}>{list}</a>
                    </li>
                  ))}
                </ul>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};
