import { useState, useEffect, useRef } from "react";
import supabase from "@/database/supabase";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";

// Tipagem para comentários
type Comment = {
  id: number;
  userUID: string;
  authorName: string;
  rating: number;
  comment: string;
  created_at: string;
};

// Tipagem para as props do componente
// type CommentsProps = {
//   userUID?: string; // Opcional
// };

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const [authorName, setAuthorName] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const emojiInputRef = useRef<HTMLTextAreaElement | null>(null);

  // Obtém o userUID do Redux ou da prop
  const userUID = useSelector((state: any) => state.profile?.profile?.userUID) 

  // Lista de emojis para o seletor
  const emojiList = ["😊", "😂", "😍", "😐", "😢", "😠", "😎", "🥳", "🤩", "🤔"];

  // Verificação e busca de comentários
  useEffect(() => {
    if (!userUID) {
      console.error("userUID está indefiddddnido ou inválido.");
      return;
    }
    fetchComments();
  }, [userUID]);

  const fetchComments = async () => {
    if (!userUID) {
      console.warn("Tentativa de buscar comentários sem userUID.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("userUID", userUID)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao buscar comentários:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim() || rating === 0 || !authorName.trim()) {
      alert("Por favor, preencha todos os campos e selecione uma classificação.");
      return;
    }

    if (!userUID) {
      alert("Erro: Usuário não autenticado. Não é possível enviar comentários.");
      return;
    }

    try {
      const { error } = await supabase.from("comments").insert([
        {
          userUID,
          authorName,
          rating,
          comment: newComment,
        },
      ]);
      if (error) throw error;

      setNewComment("");
      setRating(0);
      setAuthorName("");
      fetchComments();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao enviar comentário:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
    }
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible(!isEmojiPickerVisible);
  };

  const addEmojiToComment = (emoji: string) => {
    if (emojiInputRef.current) {
      const cursorPosition = emojiInputRef.current.selectionStart || 0;
      const newText = newComment.slice(0, cursorPosition) + emoji + newComment.slice(cursorPosition);
      setNewComment(newText);
    }
    setIsEmojiPickerVisible(false);
  };

  // Renderiza mensagem de erro se userUID não estiver disponível
  if (!userUID) {
    return (
      <div className="text-red-500">
        Erro: Usuário não autenticado. Certifique-se de estar logado para visualizar e enviar comentários.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-6 rounded-2xl border border-zinc-700 shadow-md">
        <h2 className="text-pink-700 text-2xl mb-4">Comentários</h2>
        <div className="space-y-2">
          {comments.length === 0 ? (
            <p className="text-gray-400">Ainda não há comentários.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-700 p-4 rounded-md shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < comment.rating ? (
                          <AiFillStar className="text-yellow-500" />
                        ) : (
                          <AiOutlineStar className="text-gray-500" />
                        )}
                      </span>
                    ))}
                  </div>
                  <p className="text-pink-500 text-sm font-semibold">
                    {comment.authorName || "Anônimo"}
                  </p>
                </div>
                <p className="text-white">{comment.comment}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {new Date(comment.created_at).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-2xl border border-zinc-700 shadow-md relative">
        <h3 className="text-pink-700 text-lg mb-4">Deixe seu comentário</h3>
        <input
          type="text"
          className="w-full bg-gray-800 text-white p-4 rounded-md mb-4 border border-zinc-700"
          placeholder="Seu nome"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => (
            <span key={index} onClick={() => setRating(index + 1)}>
              {index < rating ? (
                <AiFillStar className="text-yellow-500 cursor-pointer" />
              ) : (
                <AiOutlineStar className="text-gray-500 cursor-pointer" />
              )}
            </span>
          ))}
        </div>

        <textarea
          ref={emojiInputRef}
          className="w-full bg-gray-800 text-white p-4 rounded-md mb-4 border border-zinc-700"
          rows={4}
          placeholder="Escreva seu comentário aqui..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button
          onClick={handleCommentSubmit}
          className="bg-pink-700 text-white px-4 py-2 rounded-md hover:bg-pink-600"
        >
          Enviar Comentário
        </button>
      </div>
    </div>
  );
}

export default Comments;
