Add-Type -AssemblyName System.IO.Compression.FileSystem

$zip = [System.IO.Compression.ZipFile]::OpenRead("Staff_List.xlsx")
$entry = $zip.GetEntry("xl/worksheets/sheet1.xml")
$stream = $entry.Open()
[xml]$xml = (New-Object System.IO.StreamReader($stream)).ReadToEnd()
$stream.Dispose()
$zip.Dispose()

$staff = @()
$rows = $xml.worksheet.sheetData.row
for ($i = 1; $i -lt $rows.Count; $i++) {
    $r = $rows[$i]
    $map = @{}
    foreach ($c in $r.c) {
        $col = $c.r -replace '\d+',''
        $val = if ($c.is) { $c.is.t } elseif ($c.v) { $c.v } else { "" }
        $map[$col] = $val
    }
    $staff += [PSCustomObject]@{
        Name = if ($map['A']) { $map['A'].Trim() } else { "" }
        EmployeeId = if ($map['B']) { $map['B'].Trim() } else { "" }
        Role = if ($map['C']) { $map['C'].Trim() } else { "" }
        Qualification = if ($map['D']) { $map['D'].Trim() } else { "" }
        DOB = if ($map['E']) { $map['E'].Trim() } else { "" }
        Phone = if ($map['F']) { $map['F'].Trim() } else { "" }
        Address = if ($map['G']) { $map['G'].Trim() } else { "" }
    }
}

$staff | ConvertTo-Json -Depth 5 | Set-Content -Path "scripts/staff_parsed.json" -Encoding UTF8
Write-Host "Exported $($staff.Count) staff rows to scripts/staff_parsed.json"
