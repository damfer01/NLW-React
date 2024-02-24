import { ChangeEvent, useState } from 'react';
import { NewNoteCard } from './componets/NewNoteCard';
import { NoteCard } from './componets/NoteCard';
import logo from './images/assets/logo..png';
import { Search } from 'lucide-react';

interface Note {
   id: string
   date: Date
   content: string
}

export function App() {
   const [search, setSearch] = useState('')

   const [notes, setNotes] = useState<Note[]>(() => {
      const notesOnStoarage = localStorage.getItem('notes')
      if (notesOnStoarage) {
         return JSON.parse(notesOnStoarage)
      }
      return []
   })

   function onNoteCreated(content: string) {
      const newNote = {
         id: crypto.randomUUID(),
         date: new Date(),
         content,
      }

      const notesArray = [newNote, ...notes]

      localStorage.setItem('notes', JSON.stringify(notesArray))

      setNotes(notesArray)
   }

   function handleSearch(event: ChangeEvent<HTMLInputElement>) {
      const query = event.target.value

      setSearch(query)
   }

      const filterdNotes = search  !== ''
      ? notes.filter(note => note.content.includes(search))
      : notes

   return (
      <div className=' mx-auto max-w-6xl space-y-6 '>

         <img src={logo} alt="logo" />

         <form className='w-full ' >
            <input
               type=" text "
               placeholder='Busque suas notas...'
               className='w-full bg-transparent text-3xl font-semibold  tracking-tight outline-none placeholder:text-slate-500'
               onChange={handleSearch}
            />

         </form>

         <div className='h-px bg-slate-700' />

         <div className='grid  grid-cols-3 gap-6  auto-rows-[250px] '>



            <NewNoteCard onNoteCreated={onNoteCreated} />

            {filterdNotes.map(note => {
               return <NoteCard key={note.id} note={note} />
            })}


         </div>

      </div>
   )
}