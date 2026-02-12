$ErrorActionPreference = 'Stop'

chcp 65001 | Out-Null
[Console]::InputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

$baseUrl = 'https://localhost:5001'
$storeId = 'ab047df8-2f0a-4d3a-99a9-5c3da29449a0'
$jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGdWxsTmFtZSI6IlByb2dyYW1tZXIgUHJvZ3JhbW1lciIsInVuaXF1ZV9uYW1lIjoiUHJvZ3JhbW1lciIsIm5hbWVpZCI6IjYwM2M5Y2NlLTQ1YzItNDE5Yi1hNzliLTQ5N2E2YTdjZjg1MyIsIm5iZiI6MTc3MDkyNjkxOSwiZXhwIjoxNzcxMDQ2OTE5LCJpYXQiOjE3NzA5MjY5MTl9.iP3lfRascPGLPL2u7UP_y26nmWVxMtWPK0_YwalRMzw'

function Invoke-CurlJsonGet {
  param([Parameter(Mandatory = $true)][string]$Url)

  $outFile = New-TemporaryFile
  try {
    & curl.exe -sS -k $Url `
      -H "Authorization: Bearer $jwt" `
      --connect-timeout 20 `
      --max-time 90 `
      -o $outFile.FullName | Out-Null

    if ($LASTEXITCODE -ne 0) {
      throw "GET request failed: $Url"
    }

    $raw = Get-Content -LiteralPath $outFile.FullName -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($raw)) {
      throw "Empty response from: $Url"
    }

    return $raw | ConvertFrom-Json
  }
  finally {
    if (Test-Path $outFile.FullName) {
      Remove-Item -LiteralPath $outFile.FullName -Force
    }
  }
}

function Invoke-CurlJsonPost {
  param(
    [Parameter(Mandatory = $true)][string]$Url,
    [Parameter(Mandatory = $true)]$BodyObject
  )

  $bodyFile = New-TemporaryFile
  $outFile = New-TemporaryFile
  try {
    $json = $BodyObject | ConvertTo-Json -Depth 20 -Compress
    [System.IO.File]::WriteAllText($bodyFile.FullName, $json, [System.Text.UTF8Encoding]::new($false))

    & curl.exe -sS -k -X POST $Url `
      -H "Authorization: Bearer $jwt" `
      -H "Content-Type: application/json; charset=utf-8" `
      --data-binary "@$($bodyFile.FullName)" `
      --connect-timeout 20 `
      --max-time 90 `
      -o $outFile.FullName | Out-Null

    if ($LASTEXITCODE -ne 0) {
      throw "POST request failed: $Url"
    }

    $raw = Get-Content -LiteralPath $outFile.FullName -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($raw)) {
      throw "Empty response from: $Url"
    }

    return $raw | ConvertFrom-Json
  }
  finally {
    if (Test-Path $bodyFile.FullName) {
      Remove-Item -LiteralPath $bodyFile.FullName -Force
    }
    if (Test-Path $outFile.FullName) {
      Remove-Item -LiteralPath $outFile.FullName -Force
    }
  }
}

$categoryNames = @(
  'نوشیدنی‌های گرم',
  'نوشیدنی‌های سرد',
  'اسنک و تنقلات',
  'صبحانه',
  'لبنیات',
  'مواد پروتئینی',
  'میوه و سبزیجات',
  'غلات و حبوبات',
  'چاشنی و ادویه',
  'بهداشتی',
  'شوینده',
  'لوازم تحریر',
  'کالای دیجیتال',
  'خانه و آشپزخانه'
)

$productSeeds = @(
  @{ name = 'قهوه ترک'; price = 95000 },
  @{ name = 'قهوه اسپرسو'; price = 85000 },
  @{ name = 'چای دارچین'; price = 52000 },
  @{ name = 'چای ماسالا'; price = 72000 },
  @{ name = 'آب معدنی کوچک'; price = 12000 },
  @{ name = 'آبمیوه پرتقال'; price = 34000 },
  @{ name = 'نوشابه قوطی'; price = 28000 },
  @{ name = 'دوغ نعناع'; price = 25000 },
  @{ name = 'چیپس نمکی'; price = 42000 },
  @{ name = 'پفک پنیری'; price = 39000 },
  @{ name = 'شکلات تلخ'; price = 68000 },
  @{ name = 'بیسکویت کرمدار'; price = 31000 },
  @{ name = 'عسل طبیعی'; price = 155000 },
  @{ name = 'کره بادام‌زمینی'; price = 98000 },
  @{ name = 'مربای توت‌فرنگی'; price = 76000 },
  @{ name = 'نان تست'; price = 26000 },
  @{ name = 'شیر کم‌چرب'; price = 24000 },
  @{ name = 'ماست موسیر'; price = 46000 },
  @{ name = 'پنیر سفید'; price = 52000 },
  @{ name = 'خامه صبحانه'; price = 41000 },
  @{ name = 'سینه مرغ'; price = 135000 },
  @{ name = 'گوشت چرخ‌کرده'; price = 215000 },
  @{ name = 'تخم‌مرغ ۱۵ عددی'; price = 78000 },
  @{ name = 'سوسیس کوکتل'; price = 98000 },
  @{ name = 'سیب قرمز'; price = 45000 },
  @{ name = 'خیار'; price = 22000 },
  @{ name = 'گوجه فرنگی'; price = 26000 },
  @{ name = 'کاهو پیچ'; price = 30000 },
  @{ name = 'برنج ایرانی'; price = 245000 },
  @{ name = 'ماکارونی'; price = 28000 },
  @{ name = 'عدس'; price = 52000 },
  @{ name = 'نخود'; price = 56000 },
  @{ name = 'نمک دریا'; price = 18000 },
  @{ name = 'فلفل سیاه'; price = 34000 },
  @{ name = 'زعفران ۱ گرمی'; price = 165000 },
  @{ name = 'رب گوجه'; price = 45000 },
  @{ name = 'مایع دستشویی'; price = 69000 },
  @{ name = 'دستمال کاغذی'; price = 38000 },
  @{ name = 'مسواک نرم'; price = 26000 },
  @{ name = 'خمیر دندان'; price = 42000 },
  @{ name = 'مایع ظرفشویی'; price = 61000 },
  @{ name = 'پودر لباسشویی'; price = 125000 },
  @{ name = 'شیشه پاک‌کن'; price = 47000 },
  @{ name = 'سفیدکننده'; price = 53000 },
  @{ name = 'دفتر ۸۰ برگ'; price = 32000 },
  @{ name = 'خودکار آبی'; price = 12000 },
  @{ name = 'مداد مشکی'; price = 9000 },
  @{ name = 'پاک‌کن'; price = 8000 },
  @{ name = 'فلش ۳۲ گیگ'; price = 185000 },
  @{ name = 'هدفون سیمی'; price = 210000 }
)

$catRes = Invoke-CurlJsonGet "$baseUrl/Category/GetByStoreIdAsync?storeId=$storeId"
if (-not $catRes.isSuccessful) {
  throw "Cannot fetch categories: $($catRes.errorMessages -join '; ')"
}
$categories = @()
if ($catRes.data) {
  $categories = @($catRes.data)
}

$createdCategories = @()
foreach ($name in $categoryNames) {
  if ($categories.Count -ge 14) { break }

  $exists = $categories | Where-Object { $_.name -eq $name } | Select-Object -First 1
  if ($exists) { continue }

  $insertRes = Invoke-CurlJsonPost "$baseUrl/Category/InsertAsync" @{
    storeId = $storeId
    name = $name
  }
  if (-not $insertRes.isSuccessful) {
    throw "Category insert failed for '$name': $($insertRes.errorMessages -join '; ')"
  }

  $categories += $insertRes.data
  $createdCategories += $insertRes.data
}

$idx = 1
while ($categories.Count -lt 14) {
  $name = "دسته بندی $idx"
  $exists = $categories | Where-Object { $_.name -eq $name } | Select-Object -First 1
  if (-not $exists) {
    $insertRes = Invoke-CurlJsonPost "$baseUrl/Category/InsertAsync" @{
      storeId = $storeId
      name = $name
    }
    if (-not $insertRes.isSuccessful) {
      throw "Category insert failed for '$name': $($insertRes.errorMessages -join '; ')"
    }
    $categories += $insertRes.data
    $createdCategories += $insertRes.data
  }
  $idx++
}

$prodRes = Invoke-CurlJsonGet "$baseUrl/Product/GetByStoreIdAsync?storeId=$storeId"
if (-not $prodRes.isSuccessful) {
  throw "Cannot fetch products: $($prodRes.errorMessages -join '; ')"
}
$products = @()
if ($prodRes.data) {
  $products = @($prodRes.data)
}

$existingProductNames = @{}
foreach ($p in $products) {
  if ($p.name) { $existingProductNames[$p.name] = $true }
}

$createdProducts = @()
$catIndex = 0
foreach ($seed in $productSeeds) {
  if (($products.Count + $createdProducts.Count) -ge 50) { break }
  if ($existingProductNames.ContainsKey($seed.name)) { continue }

  $cat = $categories[$catIndex % $categories.Count]
  $body = @{
    storeId = $storeId
    name = $seed.name
    price = [int]$seed.price
    categoryId = $cat.id
    category = @{
      id = $cat.id
      storeId = $storeId
      name = $cat.name
    }
  }

  $insertRes = Invoke-CurlJsonPost "$baseUrl/Product/InsertAsync" $body
  if (-not $insertRes.isSuccessful) {
    throw "Product insert failed for '$($seed.name)': $($insertRes.errorMessages -join '; ')"
  }

  $createdProducts += $insertRes.data
  $existingProductNames[$seed.name] = $true
  $catIndex++
}

$counter = 1
while (($products.Count + $createdProducts.Count) -lt 50) {
  $name = "محصول $counter"
  if (-not $existingProductNames.ContainsKey($name)) {
    $cat = $categories[$counter % $categories.Count]
    $body = @{
      storeId = $storeId
      name = $name
      price = 20000 + ($counter * 1000)
      categoryId = $cat.id
      category = @{
        id = $cat.id
        storeId = $storeId
        name = $cat.name
      }
    }

    $insertRes = Invoke-CurlJsonPost "$baseUrl/Product/InsertAsync" $body
    if (-not $insertRes.isSuccessful) {
      throw "Product insert failed for '$name': $($insertRes.errorMessages -join '; ')"
    }

    $createdProducts += $insertRes.data
    $existingProductNames[$name] = $true
  }
  $counter++
}

$finalCatRes = Invoke-CurlJsonGet "$baseUrl/Category/GetByStoreIdAsync?storeId=$storeId"
$finalProdRes = Invoke-CurlJsonGet "$baseUrl/Product/GetByStoreIdAsync?storeId=$storeId"

if (-not $finalCatRes.isSuccessful -or -not $finalProdRes.isSuccessful) {
  throw "Final verification failed."
}

$finalCategories = @()
if ($finalCatRes.data) { $finalCategories = @($finalCatRes.data) }

$finalProducts = @()
if ($finalProdRes.data) { $finalProducts = @($finalProdRes.data) }

[ordered]@{
  categoriesCount = $finalCategories.Count
  productsCount = $finalProducts.Count
  createdCategoriesCount = $createdCategories.Count
  createdProductsCount = $createdProducts.Count
  sampleCategories = @($finalCategories | Select-Object -First 5 -Property id, name)
  sampleProducts = @($finalProducts | Select-Object -First 5 -Property id, name, price, categoryId)
} | ConvertTo-Json -Depth 8
