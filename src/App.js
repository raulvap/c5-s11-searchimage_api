import { useState } from "react";
import { Formik, Form, Field } from "formik";
import "./styles/headers.css";
import "./styles/content.css";
import "./styles/article.css";

function App() {
  // Clase 99: iterando imágenes
  const [photos, setPhotos] = useState([]);

  const open = (link) => window.open(link);
  console.log(photos);

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={async (values) => {
            // llamar a la API de unsplash
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`,
              {
                headers: {
                  Authorization:
                    "Client-ID C639iePyuT5pl_u9JCO_xWTgQQFo5odae-YgFngD-M8",
                },
              }
            );
            const data = await response.json();
            setPhotos(data.results);
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map((item) => (
            <article key={item.id} onClick={() => open(item.links.html)}>
              <img src={item.urls.regular} alt={item.alt_description} />
              <p>{[item.description, item.alt_description].join(" - ")}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
