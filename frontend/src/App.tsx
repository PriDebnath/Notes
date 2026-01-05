import './App.css'
import { useEffect, useState } from 'react'
import { PlusIcon } from 'lucide-react'
import { Button } from './components/ui/button'
import type { Quote } from './model/quote.model'
import { ListQuote } from './feature/quote/list.quote'
import AddEditQuoteDialog from '@/feature/quote/dialog/add-edit.quote.dialog'
import { getAllQuotes, addQuote, updateQuote, deleteQuote } from '@/db/quote.db'

function App() {
  const [loading, setLoading] = useState(false)
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [addOrEdit, setAddOrEdit] = useState<"add" | "edit">("add")
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)

  const openAddDialog = () => {
    setAddOrEdit("add")    
    setSelectedQuote(null)
    setOpenDialog(true)
  }

  const openEditDialog = (quote: Quote) => {
    setSelectedQuote(quote)
    setAddOrEdit("edit")
    setOpenDialog(true)
  }

  const handleSubmit = async (quote: Quote) => {
    console.log(quote)
    if (quote.id) { // edit
      await updateQuote(quote)
    } else {
      await addQuote({
        ...quote    ,
            id: new Date().getTime(),
      })
    }
    fetchQuotes()
    setOpenDialog(false)
        setSelectedQuote(null)

  }

  const openEditDeleteDialog = async (quote: Quote) => {
    await deleteQuote(quote.id!)
    fetchQuotes();

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
    <main>
      <div className="flex gap-4">
        <h3>List Quote</h3>
        <Button onClick={openAddDialog} > <PlusIcon /> Add Quote </Button>
      </div>

      <ListQuote loading={loading} quotes={quotes} onEdit={openEditDialog} onDelete={openEditDeleteDialog} />

      <AddEditQuoteDialog
        mode={addOrEdit}
        quote={selectedQuote}
        open={openDialog}
        setOpen={setOpenDialog}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default App
