
//import "index.scss"
import { addOrGetTag } from '@/db/tag.db'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ListQuote } from '@/feature/quote/list.quote'
import type { Quote, QuoteFormData, Tag } from '@/model/quote.model'
import DeleteQuoteDialog from '@/feature/quote/dialog/delete.quote.dialog'
import AddEditQuoteDialog from '@/feature/quote/dialog/add-edit.quote.dialog'
import { addQuoteTag, deleteAllQuoteTags, getAllQuotesDetails } from '@/db/quote_tags.db'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'
import { getAllQuotes, addQuote, updateQuote, deleteQuote, getAllQuote } from '@/db/quote.db'
import { PlusIcon, Home, BookOpen, Search, Settings, SearchIcon,LightbulbOff,Lightbulb} from 'lucide-react'
import { Link } from "@tanstack/react-router";

export function QuoteListPage() {
  const [loading, setLoading] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [quotesLocal, setQuotesLocal] = useState<Quote[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [openedDeleteDialog, setOpenedDeleteDialog] = useState(false)
  const [openAddOrEditDialog, setOpenAddOrEditDialog] = useState(false)
  const [addOrEdit, setAddOrEdit] = useState<"add" | "edit">("add")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const openAddDialog = () => {
    setAddOrEdit("add")
    setSelectedQuote(null)
    setOpenAddOrEditDialog(true)
  }

  const openEditDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setAddOrEdit("edit")
    setOpenAddOrEditDialog(true)
  }

  const openDeleteDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setOpenedDeleteDialog(true)
  }

  const getTags = async (tags: string[]): Promise<Tag[]> => {
    const result: Tag[] = [];

    for (const tag of tags) {
      const savedTag = await addOrGetTag({ name: tag });
      result.push(savedTag);
    }

    return result;
  };


  const handleSubmit = async (quote: QuoteFormData) => {
    console.log({quote})
  let quoteId: number | undefined = quote.id
  if (quoteId) { // edit
    await updateQuote({
      ...quote,
      text: quote.text || "Empty"
    })
  } else {
    const newQuote = await addQuote({
      ...quote,
      text: quote.text || "Empty",
    })
    quoteId = newQuote.id
  }

  console.log({quoteId});
  
  const tags = await getTags(quote.tags!)
  console.log({ tags })

  // Delete all existing tags for this quote
  await deleteAllQuoteTags(quoteId!)

  // Add new tags for this quote
  for (const tag of tags) {
    await addQuoteTag({
      quoteId: quoteId!,
      tagId: tag.id!
    })
  }

  fetchQuotes()
  setOpenAddOrEditDialog(false)
  setSelectedQuote(null)
}

const handleDeleteSubmit = async (quote: QuoteFormData) => {
  console.log("deleted")
  await deleteQuote(quote.id!)
  console.log("deleted")
  setSelectedQuote(null)
  setOpenedDeleteDialog(false)
  fetchQuotes()
}

const fetchQuotes = async () => {
  const storedQuotes = await getAllQuotesDetails();
 console.log({storedQuotes});
 
  setLoading(false)
  setSelectedQuote(null)
  setQuotes(storedQuotes);
  setQuotesLocal(storedQuotes);
};

const showSearchResult = (search:string)=>{
  let searchTerm = search.trim()
  let filteredQuotes = quotesLocal.filter((quote)=>quote.text.includes(searchTerm))
  console.log(filteredQuotes, searchTerm)
  if(searchTerm){
    setQuotes(filteredQuotes)
  }else{
    setQuotes(quotesLocal)
  }
    
}

useEffect(() => {
  setLoading(true)
  setDarkMode(true)
  document.documentElement.classList.add("dark")
  fetchQuotes();
}, []);

return (
  <div className="">
    {/* 
    Purple Header 
    */}
    {/* 
    <header className="w-full text-white bg-rose-900  p-4 flex flex-col items-center">
      <h1 className="p-4">Quotes Keeper 3.0</h1>
    </header>
    */}

    {/* Sticky Search Bar */}
    <div
      className="rounded-b-2xl flex flex-col sticky bg-background top-0 z-20 p-4 gap-4">
    <div className="w-full text-right">
       <Button
        size={"icon"}
        variant="outline"
        className="rounded-full "
        onClick={()=>{
        setDarkMode(!darkMode)
        document.documentElement.classList.toggle("dark")
        }}>
        { darkMode ? <LightbulbOff />: <Lightbulb/>}
      </Button>
    </div>
      <InputGroup
        className=" border">
        <InputGroupInput 
        placeholder="Search..." 
        className=''
        onChange={(e)=>{
          let search = e.target.value
          showSearchResult(search)
        }} 
        />
        <InputGroupAddon>
          <SearchIcon 
            className='' 
          />
        </InputGroupAddon>
      </InputGroup>
    </div>

    {/* Main Content */}
    <main className="p-4 ">
      <ListQuote
        loading={loading}
        quotes={quotes}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />
    </main>

    {/* Bottom Navigation */}
    <nav className="flex items-center justify-center ">
      {/* <button className="nav-item active">
          <Home size={24} />
          <span>Home</span>
        </button>
        <button className="nav-item">
          <BookOpen size={24} />
          <span>Books</span>
        </button> */}
                <Link to={"/new"}>
      <Button
      size={"icon-lg"}
        className=" fixed bottom-8 rounded-full  aspect-square scale-150 "
        onClick={openAddDialog}>
        <PlusIcon />
      </Button>
      </Link>
      {/* <button className="nav-item">
          <Search size={24} />
          <span>Discover</span>
        </button>
        <button className="nav-item">
          <Settings size={24} />
          <span>Settings</span>
        </button> */}
    </nav>

    <AddEditQuoteDialog
      mode={addOrEdit}
      quote={selectedQuote}
      open={openAddOrEditDialog}
      setOpen={setOpenAddOrEditDialog}
      handleSubmit={handleSubmit}
    />

    <DeleteQuoteDialog
      open={openedDeleteDialog}
      setOpen={setOpenedDeleteDialog}
      quote={selectedQuote}
      handleDelete={handleDeleteSubmit}
    />
  </div>
)
}

