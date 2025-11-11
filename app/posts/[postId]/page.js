import { db } from "../../lib/firebaseAdmin";

export async function generateMetadata({ params }) {
    const postId = params.postId;
    let postData = null;

    try {
        console.log(params,'hello')
        const doc = await db.collection("posts").doc(postId).get();
        if (doc.exists) postData = doc.data();
    } catch (err) {
        console.error("Error fetching Firestore doc:", err);
    }

    const title = postData?.title || "43 Initiative | Acts of Kindness";
    const description =
        postData?.caption ||
        "Join the movement to share your acts of kindness with the world.";
    const thumbUrl =
        postData?.thumbUrl ||
        "https://storage.googleapis.com/dev-f8c49.firebasestorage.app/thumbs/default.jpg";
    const missionUrl = `https://shareyour43.com/posts/${postId}`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: missionUrl,
            images: [{ url: thumbUrl }],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [thumbUrl],
        },
    };
}

export default async function PostPage({ params }) {
    const postId = params.postId;
    let postData = null;

    try {
        console.log('here')
        const doc = await db.collection("posts").doc(postId).get();
        if (doc.exists) postData = doc.data();
    } catch (err) {
        console.error("Error fetching Firestore doc:", err);
    }

    const title = postData?.title || "Mission Not Found";
    const description = postData?.txt || "";
    const thumbUrl = postData?.thumbUrl;

    return (
        <main style={{ textAlign: "center", padding: "2rem" }}>
            <h1>{title}</h1>
            <p>{description}hi</p>
            {thumbUrl && (
                <img
                    src={thumbUrl}
                    alt="Mission Thumbnail"
                    style={{ marginTop: "1.5rem", borderRadius: "12px", maxWidth: "100%" }}
                />
            )}
        </main>
    );
}
