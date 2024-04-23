import "./About.css"
import "./main-container.css"


function About() {
    return (
        <div>
            <section className="main_container">
                <div className="about_container_inner">
                    <h4 className="about_general_info">
                        <strong className="general_info_title">Short story</strong>
                        <p>
                            In a bustling city, TechVision Inc. thrived under CEO Dr. Sarah Hughes' visionary leadership. Their latest creation, Atlas, a humanoid robot, aimed to revolutionize disaster relief.

        When a nearby earthquake struck, TechVision deployed Atlas. With unwavering determination, the team witnessed Atlas navigate rubble and save lives, earning global acclaim.

        TechVision's triumph wasn't just in innovation but in making a real difference. With Dr. Hughes at the helm, they continued to redefine what was possible, one invention at a time.
                        </p>
                    </h4>
                    <div className="about_team">
                        <div className="teammate_info">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/220px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg" />
                            <p className="teammate_name">Elon Musk</p>
                            <p>CEO</p>
                        </div>
                        <div className="teammate_info">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/220px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg" />
                            <p className="teammate_name">Mark Zuckerberg</p>
                            <p>Operations Coordinator</p>
                        </div>
                        <div className="teammate_info">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Bjarne-stroustrup_%28cropped%29.jpg/220px-Bjarne-stroustrup_%28cropped%29.jpg" />
                            <p className="teammate_name">Bjarne Stroustrup</p>
                            <p>Software Engineer</p>
                        </div>
                        <div className="teammate_info">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Guido_van_Rossum_OSCON_2006.jpg/220px-Guido_van_Rossum_OSCON_2006.jpg" />
                            <p className="teammate_name">Guido van Rossum</p>
                            <p>Software Engineer</p>
                        </div>
                        <div className="teammate_info">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg/220px-Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg" />
                            <p className="teammate_name">Jeff Bezos</p>
                            <p>Sales Associate</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default About;
