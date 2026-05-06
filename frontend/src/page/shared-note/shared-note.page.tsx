import { Route } from "@/routes/shared-note/$_id"
import { useGetCloudQuote } from "@/feature/user/hook/use-get-cloud-quote.hook";
import NoteCardComponent from "@/feature/shared-note/component/NoteCardComponent";
import { LoaderFull } from "@/components/ui/loader-full";


function SharedNotePage() {
    const { _id } = Route.useParams()
    const { data, isPending } = useGetCloudQuote({ _id })

    return (
        <div className="p-4">
            {(isPending) && <LoaderFull />}
            {(data && data?.shared) && <NoteCardComponent quote={data} />}
            {(data && !data?.shared) && (<p>The secrect was not shared...</p>)}
        </div>
    )
}
export default SharedNotePage