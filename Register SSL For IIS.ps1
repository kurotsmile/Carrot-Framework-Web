
if (-not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))
{
    Start-Process powershell -Verb runAs -ArgumentList "-File `"$PSCommandPath`""
    exit
}


$DnsName = Read-Host "Enter Host Name (Ex:example.com)"


New-SelfSignedCertificate -CertStoreLocation cert:\LocalMachine\My -DnsName "$DnsName" -NotAfter (Get-Date).AddYears(10) -FriendlyName "$DnsName (self-signed certificate for 10 years)"

Write-Host "Create success $DnsName"
