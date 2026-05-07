import { Route } from "@/routes/shared-note/$_id"
import { useGetCloudNote } from "@/feature/user/hook/use-get-cloud-note.hook";
import NoteCardComponent from "@/feature/shared-note/component/NoteCardComponent";
import { LoaderFull } from "@/components/ui/loader-full";
import NavigationComponent from "@/feature/user/component/NavigationComponent";
import { useGetUser } from "@/feature/user/hook/use-get-user.hook";


function SharedNotePage() {
    const { _id } = Route.useParams()
    const { data: note, isPending } = useGetCloudNote({ _id })
    const { data: user, } = useGetUser({ _id: note?.user })

    return (
        <div className="p-4 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <NavigationComponent />
                {user && (
                    <span >
                        Shared by:
                        <span className="font-bolder">
                         {" "} {user?.name}
                        </span>
                    </span>
                )
                }
            </div>
            <div >
                {(isPending) && <LoaderFull />}
                {(note && note?.shared) && <NoteCardComponent note={note} />}
                {(note && !note?.shared) && (<p>The secrect was not shared...</p>)}
            </div>
        </div>
    )
}
export default SharedNotePage