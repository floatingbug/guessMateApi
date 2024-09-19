json=$(cat <<EOF
{
   "quizTitle": "Quiz title",
   "quiz": [
        {
            "question": "question 1",
            "answers": ["answer 1", "answer 2", "answer 3", "answer 4" ]
        },
        {
            "question": "question 2",
            "answers": ["answer 1", "answer 2", "answer 3", "answer 4" ]
        },
        {
            "question": "question 3",
            "answers": ["answer 1", "answer 2", "answer 3", "answer 4" ]
        },
        {
            "question": "question 4",
            "answers": ["answer 1", "answer 2", "answer 3", "answer 4" ]
        }
   ]
}
EOF
)

curl -i \
    -H "Authorization: $AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d "$json" \
    http://localhost:3000/add-quiz
