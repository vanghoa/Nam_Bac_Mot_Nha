import MausoleumScripts from '@/components/mausoleum';

export default async function Home() {
    return (
        <>
            <MausoleumScripts></MausoleumScripts>
            <div id="glass" className="outerdiv">
                <div></div>
            </div>
            <div id="mausoleum" className="outerdiv">
                <iframe src="https://docs.google.com/document/d/1sIAI_vdg6FLcGxDJfGyFfj3Ng9oF-89YiG8djs3k4ls/"></iframe>
            </div>
        </>
    );
}
