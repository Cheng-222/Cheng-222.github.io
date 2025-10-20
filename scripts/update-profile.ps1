$ErrorActionPreference = "Stop"
$api = "http://localhost:3000/api/profile"
$body = [PSCustomObject]@{
  name = "测试保存"
  title = "后端写入验证"
  intro = "这是一条用于验证数据库写入的更新。"
  email = "verify@example.com"
  wechat = "verify_wechat"
  avatar = $null
} | ConvertTo-Json -Depth 4
Write-Host "PUT /api/profile:"
Invoke-RestMethod -Uri $api -Method Put -ContentType "application/json" -Body $body | ConvertTo-Json -Depth 4
Write-Host "GET /api/profile:"
Invoke-RestMethod -Uri $api | ConvertTo-Json -Depth 4