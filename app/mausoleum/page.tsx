import MausoleumScripts from '@/components/mausoleum';

export default async function Home() {
    return (
        <>
            <MausoleumScripts></MausoleumScripts>
            <div id="glass" className="outerdiv">
                <div></div>
            </div>
            <div id="mausoleum" className="outerdiv">
                <iframe src="https://docs.google.com/document/d/15bTvul1DJaX0WfnKyBR8k0ZDPtWNYjjyzq3PVn5ciSY/"></iframe>
            </div>
        </>
    );
}
