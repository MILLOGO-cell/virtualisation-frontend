import Image from "next/image";
import styles from "./page.module.css";
import Head from "next/head";

export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
      <title>Gestion de Bibliothèque</title>
      <meta name="description" content="Application de gestion de bibliothèque" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header className={styles.header}>
      <h1>Gestion de Bibliothèque</h1>
      <nav className={styles.nav}>
        <a href="/livres">Livres</a>
        <a href="/auteurs">Auteurs</a>
        <a href="/categories">Catégories</a>
        <a href="/emprunts">Emprunts</a>
        <a href="/clients">Clients</a>
      </nav>
    </header>

    <main className={styles.main}>
      <section className={styles.welcome}>
        <h2>Bienvenue dans notre application de gestion de bibliothèque !</h2>
        <p>Gérez vos livres, auteurs, clients et emprunts facilement.</p>
      </section>

      <section className={styles.quickLinks}>
          <div className={styles.card}>
            <Image src="https://img.freepik.com/free-photo/front-view-stack-books_23-2148827190.jpg?t=st=1721924431~exp=1721928031~hmac=b14f07a27cf0810225cbbf29d12ace6a4eba1e8fb10b954c7ba751d605b03688&w=740" alt="Livres" width={250} height={150} className={styles.cardImage} />
            <h3>Liste des Livres</h3>
            <p>Consultez et gérez tous les livres de la bibliothèque.</p>
            <a href="/livres" className={styles.button}>Voir les Livres</a>
          </div>
          <div className={styles.card}>
            <Image src="https://img.freepik.com/free-photo/illustrator-drawing-tablet-front-view_23-2150040143.jpg?t=st=1721924796~exp=1721928396~hmac=bc1c63b070f9c144c9fd50893df651d2a2c87130d4d4b273aea36bb729bac198&w=1380" alt="Auteurs" width={250} height={150} className={styles.cardImage} />
            <h3>Auteurs</h3>
            <p>Accédez aux informations sur les auteurs.</p>
            <a href="/auteurs" className={styles.button}>Voir les Auteurs</a>
          </div>
          <div className={styles.card}>
            <Image src="https://img.freepik.com/free-photo/pile-books_1101-38.jpg?t=st=1721924838~exp=1721928438~hmac=4f9f90ea46faaceef62d83fdab08268ac894339c125f2733a7a82a72e79eff1b&w=826" alt="Catégories" width={250} height={150} className={styles.cardImage} />
            <h3>Catégories</h3>
            <p>Explorez les différentes catégories de livres.</p>
            <a href="/categories" className={styles.button}>Voir les Catégories</a>
          </div>
          <div className={styles.card}>
            <Image src="https://img.freepik.com/free-photo/study-group-learning-library_23-2149215410.jpg?t=st=1721924905~exp=1721928505~hmac=d310be39e63aa24d17f9bce28ed2f2f7fed939a4d5db89154c0ff516e0f9a126&w=1060" alt="Emprunts" width={250} height={150} className={styles.cardImage} />
            <h3>Emprunts</h3>
            <p>Consultez et gérez les emprunts de livres.</p>
            <a href="/emprunts" className={styles.button}>Voir les Emprunts</a>
          </div>
          <div className={styles.card}>
            <Image src="https://img.freepik.com/free-photo/study-group-african-people_23-2149156417.jpg?t=st=1721924935~exp=1721928535~hmac=4af757f106ef95c83675e973b8a7f6d1894231e5223d783e3ae93204118eee79&w=1060" alt="Clients" width={250} height={150} className={styles.cardImage} />
            <h3>Clients</h3>
            <p>Gérez les informations sur les clients de la bibliothèque.</p>
            <a href="/clients" className={styles.button}>Voir les Clients</a>
          </div>
        </section>
    </main>

    <footer className={styles.footer}>
      <p>Contactez-nous à : contact@bibliotheque.com</p>
      <p>&copy; 2024 Gestion de Bibliothèque. Tous droits réservés.</p>
    </footer>
  </div>
);
}
