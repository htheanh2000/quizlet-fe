import { Input } from "../ui/input";

export function FlashcardCreateCard () {

    return (
        <div className="w-full border border-gray-500 rounded p-8">
            <p className="m-0 p-0">1</p>
            <div className="h-[1px] my-2 w-full bg-gray-500"></div>
            <div className="flex gap-4">
                <Input placeholder="Front desciption"/>
                <Input placeholder="Back desciption"/>
            </div>
        </div>
    )


}