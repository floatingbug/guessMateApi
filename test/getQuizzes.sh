read -p "Enter name: " name

curl http://localhost:3000/get-quizzes/?name=$name
