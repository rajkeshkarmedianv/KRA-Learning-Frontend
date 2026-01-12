"use client"

import {
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query"
import { useState } from "react"

interface Todo {
  id: number
  title: string
  completed: boolean
}



const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:4000/todos")
  return res.json()
}

const addTodo = async (todo: { title: string }): Promise<Todo> => {
  const res = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...todo, completed: false })
  })
  return res.json()
}

const updateTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch(`http://localhost:4000/todos/${todo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo)
  })
  return res.json()
}

const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`http://localhost:4000/todos/${id}`, {
    method: "DELETE"
  })
}

export default function Page() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")
  const [editId, setEditId] = useState<number | null>(null)

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    retry: false
  })

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setTitle("")
    }
  })

  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
      setEditId(null)
      setTitle("")
    }
  })

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      
      {/* CARD */}
      <div className="w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
             Todo App
          </h1>
        
          
        </div>

        {/* INPUT */}
        <div className="flex gap-3 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 rounded-xl bg-white/20 text-white placeholder-white/60 px-4 py-3 outline-none border border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-500/40 transition"
          />

          {editId ? (
            <button
              onClick={() =>
                updateMutation.mutate({
                  id: editId,
                  title,
                  completed: false
                })
              }
              className="rounded-xl px-5 py-3 bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
            >
              Update
            </button>
          ) : (
            <button
              onClick={() => addMutation.mutate({ title })}
              className="rounded-xl px-5 py-3 bg-purple-600 text-white font-semibold hover:bg-purple-500 transition"
            >
              Add
            </button>
          )}
        </div>

        {/* TODO LIST */}
        <ul className="space-y-3 max-h-90 overflow-y-auto pr-1">
          {todos?.map(todo => (
            <li
              key={todo.id}
              className="group flex items-center justify-between rounded-xl bg-white/10 border border-white/15 px-4 py-3 hover:bg-white/20 transition"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    updateMutation.mutate({
                      ...todo,
                      completed: !todo.completed
                    })
                  }
                  className="h-5 w-5 accent-purple-500 cursor-pointer"
                />

                <span
                  className={`text-sm font-medium ${
                    todo.completed
                      ? "line-through text-white/40"
                      : "text-white"
                  }`}
                >
                  {todo.title}
                </span>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => {
                    setEditId(todo.id)
                    setTitle(todo.title)
                  }}
                  className="px-3 py-1.5 text-xs rounded-lg bg-blue-500 text-white hover:bg-blue-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteMutation.mutate(todo.id)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-red-500 text-white hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos?.length === 0 && (
          <p className="text-center text-white/60 mt-8">
             No todos yet. Add your first one!
          </p>
        )}
      </div>
    </div>
  )
}
