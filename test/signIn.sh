read -p "Enter name or email and password: " name password

json=$(cat <<EOF
{
    "name": "$name",
    "password": "$password"
}
EOF
)

response=$(curl -i \
    -H "Content-Type: application/json" \
    -d "$json" \
    http://localhost:3000/sign-in
)

auth_header=$(echo "$response" | grep -i "^Authorization:")

auth_token=$(echo "$auth_header" | sed 's/^Authorization: Bearer //' | tr -d '\r')

echo "Extracted Token: $auth_token"

export AUTH_TOKEN=$auth_token
