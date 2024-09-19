read -p "Enter quizId: " quizId

json=$(cat <<EOF
{
    "quizId": "$quizId",
    "answers": [2,1,2,3]
}
EOF
)

curl \
    -H "Authorization: $AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$json" \
    http://localhost:3000/add-guess
