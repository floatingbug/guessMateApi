read -p "Enter quizId: " quizId

json=$(cat << EOF
{
    "quizId": "$quizId",
    "answers": [2,2,1,0]
}
EOF
)

curl -i \
    -H "Authorization: $AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$json" \
    http://localhost:3000/add-quiz-answer
