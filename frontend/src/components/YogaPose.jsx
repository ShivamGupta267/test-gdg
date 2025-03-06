import { useEffect, useState } from "react";

const YogaPoses = () => {
    const [poses, setPoses] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/yoga-poses")
            .then((res) => res.json())
            .then((data) => setPoses(data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            <h1>Yoga Poses</h1>
            <ul>
                {poses.map((pose) => {
                    if (!pose.media) {
                        return (
                            <li key={pose._id}>
                                <h3>{pose.name}</h3>
                                <p>{pose.instructions.join(", ")}</p>
                                <p>Video not available</p>
                            </li>
                        );
                    }

                    const videoId = pose.media.includes("id=") ? pose.media.split("id=")[1] : "";
                    const embedUrl = videoId ? `https://drive.google.com/file/d/${videoId}/preview` : "";

                    return (
                        <li key={pose._id}>
                            <h3>{pose.name}</h3>
                            <p>{pose.instructions.join(", ")}</p>
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    width="400"
                                    height="250"
                                    allow="autoplay"
                                    title={pose.name}
                                ></iframe>
                            ) : (
                                <p>Invalid video URL</p>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default YogaPoses;
