read -p "Enter name, email, and password: " name email password

json=$(cat <<EOF
{
    "name": "$name",
    "email": "$email",
    "password": "$password"
}
EOF
)

curl \
    -H "Content-Type: application/json" \
    -d "$json" \
    http://localhost:3000/sign-up
