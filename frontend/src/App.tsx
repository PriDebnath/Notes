import './App.css'
import { useEffect, useState } from 'react'
import { PlusIcon, Home, BookOpen, Search, Settings, SearchIcon } from 'lucide-react'
import type { Quote } from '@/model/quote.model'
import { ListQuote } from '@/feature/quote/list.quote'
import AddEditQuoteDialog from '@/feature/quote/dialog/add-edit.quote.dialog'
import { getAllQuotes, addQuote, updateQuote, deleteQuote } from '@/db/quote.db'
import DeleteQuoteDialog from '@/feature/quote/dialog/delete.quote.dialog'
import { InputGroup, InputGroupInput, InputGroupAddon } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

function App() {
  const [loading, setLoading] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
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

  const handleSubmit = async (quote: Quote) => {
    console.log(quote)
    if (quote.id) { // edit
      await updateQuote(quote)
    } else {
      await addQuote({
        ...quote,
        id: new Date().getTime(),
      })
    }
    fetchQuotes()
    setOpenAddOrEditDialog(false)
    setSelectedQuote(null)
  }

  const handleDeleteSubmit = async (quote: Quote) => {
    console.log("deleted")
    await deleteQuote(quote.id!)
    console.log("deleted")
    setSelectedQuote(null)
    setOpenedDeleteDialog(false)
    fetchQuotes()
  }

  const fetchQuotes = async () => {
    const storedQuotes = await getAllQuotes();
    console.log({ storedQuotes });
    setLoading(false)
    setSelectedQuote(null)
    setQuotes(storedQuotes);
  };

  useEffect(() => {
    setLoading(true)
    fetchQuotes();
  }, []);

  return (
    <div className="">
      {/* Purple Header */}
      <header className="w-full text-white rounded-b-2xl bg-purple-600 text-white p-4 flex flex-col items-center">
        <h1 className="p-4">Quotes Keeper 3.0</h1>
           <InputGroup className="mb-4 text-white border-white border">
        <InputGroupInput placeholder="Search..." className='text-white' />
        <InputGroupAddon>
          <SearchIcon className='text-white'/>
        </InputGroupAddon>
      </InputGroup>
      </header>

      {/* Main Content */}
      <main className="p-4">
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
        <Button className="fixed bottom-4 !border-gray-500 border-lg !bg-white" onClick={openAddDialog}>
          <PlusIcon className='!text-green-500' />
        </Button>
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

export default App
