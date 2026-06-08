#!/bin/bash
echo "Listing: Influencers Assets (1qhtP3HXpOg-jBKFQbNyT7ucCWbfRdoLT)"
agent-browser --session "list-1qhtP3HXpOg-jBKFQbNyT7ucCWbfRdoLT" open "https://drive.google.com/drive/folders/1qhtP3HXpOg-jBKFQbNyT7ucCWbfRdoLT" && sleep 5 && agent-browser --session "list-1qhtP3HXpOg-jBKFQbNyT7ucCWbfRdoLT" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1qhtP3HXpOg-jBKFQbNyT7ucCWbfRdoLT.txt"
echo "Listing: Ilona-Jade Errington (ilonajte) (1QIcx7p128Xh7B2xgVSluAMaivNnj-jZa)"
agent-browser --session "list-1QIcx7p128Xh7B2xgVSluAMaivNnj-jZa" open "https://drive.google.com/drive/folders/1QIcx7p128Xh7B2xgVSluAMaivNnj-jZa" && sleep 5 && agent-browser --session "list-1QIcx7p128Xh7B2xgVSluAMaivNnj-jZa" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1QIcx7p128Xh7B2xgVSluAMaivNnj-jZa.txt"
echo "Listing: [NO] Yen Ru (yenru_yr) (1UW5KKEgL_6AtFVUNhu2FHFHozZPn_7HI)"
agent-browser --session "list-1UW5KKEgL_6AtFVUNhu2FHFHozZPn_7HI" open "https://drive.google.com/drive/folders/1UW5KKEgL_6AtFVUNhu2FHFHozZPn_7HI" && sleep 5 && agent-browser --session "list-1UW5KKEgL_6AtFVUNhu2FHFHozZPn_7HI" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1UW5KKEgL_6AtFVUNhu2FHFHozZPn_7HI.txt"
echo "Listing: 00 UGC Reviews (1hqEHqF91w6N-Fs_hMlVinXWWSLqyXMBy)"
agent-browser --session "list-1hqEHqF91w6N-Fs_hMlVinXWWSLqyXMBy" open "https://drive.google.com/drive/folders/1hqEHqF91w6N-Fs_hMlVinXWWSLqyXMBy" && sleep 5 && agent-browser --session "list-1hqEHqF91w6N-Fs_hMlVinXWWSLqyXMBy" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1hqEHqF91w6N-Fs_hMlVinXWWSLqyXMBy.txt"
echo "Listing: Adam Medhurst (adammedhurst) (1X3DHsYzTyRre0JgUaoSm6AkfByuPT9q-)"
agent-browser --session "list-1X3DHsYzTyRre0JgUaoSm6AkfByuPT9q-" open "https://drive.google.com/drive/folders/1X3DHsYzTyRre0JgUaoSm6AkfByuPT9q-" && sleep 5 && agent-browser --session "list-1X3DHsYzTyRre0JgUaoSm6AkfByuPT9q-" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1X3DHsYzTyRre0JgUaoSm6AkfByuPT9q-.txt"
echo "Listing: Adrian Meronk (1nYgT1gQ9d0GpGbWAdrtO_d0yMVGTx2-M)"
agent-browser --session "list-1nYgT1gQ9d0GpGbWAdrtO_d0yMVGTx2-M" open "https://drive.google.com/drive/folders/1nYgT1gQ9d0GpGbWAdrtO_d0yMVGTx2-M" && sleep 5 && agent-browser --session "list-1nYgT1gQ9d0GpGbWAdrtO_d0yMVGTx2-M" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1nYgT1gQ9d0GpGbWAdrtO_d0yMVGTx2-M.txt"
echo "Listing: Ads Creative (1yD2MUvWBMO8mH1lmUqpLYYbybsr3ynpg)"
agent-browser --session "list-1yD2MUvWBMO8mH1lmUqpLYYbybsr3ynpg" open "https://drive.google.com/drive/folders/1yD2MUvWBMO8mH1lmUqpLYYbybsr3ynpg" && sleep 5 && agent-browser --session "list-1yD2MUvWBMO8mH1lmUqpLYYbybsr3ynpg" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1yD2MUvWBMO8mH1lmUqpLYYbybsr3ynpg.txt"
echo "Listing: Ahmad Edits (1N9eEbmdgCPL8sSoQyTXF3OcIFjYat45K)"
agent-browser --session "list-1N9eEbmdgCPL8sSoQyTXF3OcIFjYat45K" open "https://drive.google.com/drive/folders/1N9eEbmdgCPL8sSoQyTXF3OcIFjYat45K" && sleep 5 && agent-browser --session "list-1N9eEbmdgCPL8sSoQyTXF3OcIFjYat45K" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1N9eEbmdgCPL8sSoQyTXF3OcIFjYat45K.txt"
echo "Listing: AI Motion (1_GsnH3p8SAykxiFuCDHaw6RtyTGXlcl1)"
agent-browser --session "list-1_GsnH3p8SAykxiFuCDHaw6RtyTGXlcl1" open "https://drive.google.com/drive/folders/1_GsnH3p8SAykxiFuCDHaw6RtyTGXlcl1" && sleep 5 && agent-browser --session "list-1_GsnH3p8SAykxiFuCDHaw6RtyTGXlcl1" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1_GsnH3p8SAykxiFuCDHaw6RtyTGXlcl1.txt"
echo "Listing: Albina Mannanova (albimanna) (1TGfK-afOjaFIht0jQ9eT1LLdapW8qsbi)"
agent-browser --session "list-1TGfK-afOjaFIht0jQ9eT1LLdapW8qsbi" open "https://drive.google.com/drive/folders/1TGfK-afOjaFIht0jQ9eT1LLdapW8qsbi" && sleep 5 && agent-browser --session "list-1TGfK-afOjaFIht0jQ9eT1LLdapW8qsbi" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1TGfK-afOjaFIht0jQ9eT1LLdapW8qsbi.txt"
echo "Listing: Alexa Noban (alexanoban) (1x4_6Z4HBirnFuDEHCtdOVBowtR7qvyrr)"
agent-browser --session "list-1x4_6Z4HBirnFuDEHCtdOVBowtR7qvyrr" open "https://drive.google.com/drive/folders/1x4_6Z4HBirnFuDEHCtdOVBowtR7qvyrr" && sleep 5 && agent-browser --session "list-1x4_6Z4HBirnFuDEHCtdOVBowtR7qvyrr" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1x4_6Z4HBirnFuDEHCtdOVBowtR7qvyrr.txt"
echo "Listing: Alexandra Daccache (1L_BQNBRAPsXVRVgmibV3Xh5Q4Lm9UCqm)"
agent-browser --session "list-1L_BQNBRAPsXVRVgmibV3Xh5Q4Lm9UCqm" open "https://drive.google.com/drive/folders/1L_BQNBRAPsXVRVgmibV3Xh5Q4Lm9UCqm" && sleep 5 && agent-browser --session "list-1L_BQNBRAPsXVRVgmibV3Xh5Q4Lm9UCqm" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1L_BQNBRAPsXVRVgmibV3Xh5Q4Lm9UCqm.txt"
echo "Listing: Alyssa Simpson (1DLNu1hncqo5QScRh3Ce4hJBsfvVhQIxN)"
agent-browser --session "list-1DLNu1hncqo5QScRh3Ce4hJBsfvVhQIxN" open "https://drive.google.com/drive/folders/1DLNu1hncqo5QScRh3Ce4hJBsfvVhQIxN" && sleep 5 && agent-browser --session "list-1DLNu1hncqo5QScRh3Ce4hJBsfvVhQIxN" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1DLNu1hncqo5QScRh3Ce4hJBsfvVhQIxN.txt"
echo "Listing: Amone Miller (1jlgUNR1g5G2WoYuG_r7LnkVsizJK3ue0)"
agent-browser --session "list-1jlgUNR1g5G2WoYuG_r7LnkVsizJK3ue0" open "https://drive.google.com/drive/folders/1jlgUNR1g5G2WoYuG_r7LnkVsizJK3ue0" && sleep 5 && agent-browser --session "list-1jlgUNR1g5G2WoYuG_r7LnkVsizJK3ue0" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1jlgUNR1g5G2WoYuG_r7LnkVsizJK3ue0.txt"
echo "Listing: Amy Shah (dramyshah) (1fwLE1jY2HfjYwMl2sLlsaGllDxEAXaEx)"
agent-browser --session "list-1fwLE1jY2HfjYwMl2sLlsaGllDxEAXaEx" open "https://drive.google.com/drive/folders/1fwLE1jY2HfjYwMl2sLlsaGllDxEAXaEx" && sleep 5 && agent-browser --session "list-1fwLE1jY2HfjYwMl2sLlsaGllDxEAXaEx" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1fwLE1jY2HfjYwMl2sLlsaGllDxEAXaEx.txt"
echo "Listing: Andrei, Anton, Jason (Team Sabalenka) (18z98e9sIK9O4RLXCB_tVcDkRstgXLBLn)"
agent-browser --session "list-18z98e9sIK9O4RLXCB_tVcDkRstgXLBLn" open "https://drive.google.com/drive/folders/18z98e9sIK9O4RLXCB_tVcDkRstgXLBLn" && sleep 5 && agent-browser --session "list-18z98e9sIK9O4RLXCB_tVcDkRstgXLBLn" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_18z98e9sIK9O4RLXCB_tVcDkRstgXLBLn.txt"
echo "Listing: Andrew Lo (fatwest) (1HL6gZTLkbrkTEjRQKzDhC7K9cq-oPi6f)"
agent-browser --session "list-1HL6gZTLkbrkTEjRQKzDhC7K9cq-oPi6f" open "https://drive.google.com/drive/folders/1HL6gZTLkbrkTEjRQKzDhC7K9cq-oPi6f" && sleep 5 && agent-browser --session "list-1HL6gZTLkbrkTEjRQKzDhC7K9cq-oPi6f" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1HL6gZTLkbrkTEjRQKzDhC7K9cq-oPi6f.txt"
echo "Listing: Anna Davey (anna.davey) (1frdTYL0yXj0-W14kC4uNLbp0d48H3Aw6)"
agent-browser --session "list-1frdTYL0yXj0-W14kC4uNLbp0d48H3Aw6" open "https://drive.google.com/drive/folders/1frdTYL0yXj0-W14kC4uNLbp0d48H3Aw6" && sleep 5 && agent-browser --session "list-1frdTYL0yXj0-W14kC4uNLbp0d48H3Aw6" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1frdTYL0yXj0-W14kC4uNLbp0d48H3Aw6.txt"
echo "Listing: Ara Suppiah (draraoncall) (1P4SlIxfBNo1ntiWiwIWLYu3lxR4dt5dX)"
agent-browser --session "list-1P4SlIxfBNo1ntiWiwIWLYu3lxR4dt5dX" open "https://drive.google.com/drive/folders/1P4SlIxfBNo1ntiWiwIWLYu3lxR4dt5dX" && sleep 5 && agent-browser --session "list-1P4SlIxfBNo1ntiWiwIWLYu3lxR4dt5dX" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1P4SlIxfBNo1ntiWiwIWLYu3lxR4dt5dX.txt"
echo "Listing: Aryna Sabalenka (1nYs9J6IhIYznTZkcA1A4kHBc2DN_u1fG)"
agent-browser --session "list-1nYs9J6IhIYznTZkcA1A4kHBc2DN_u1fG" open "https://drive.google.com/drive/folders/1nYs9J6IhIYznTZkcA1A4kHBc2DN_u1fG" && sleep 5 && agent-browser --session "list-1nYs9J6IhIYznTZkcA1A4kHBc2DN_u1fG" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1nYs9J6IhIYznTZkcA1A4kHBc2DN_u1fG.txt"
echo "Listing: Aspire (Agency) (1q34lBqlSq3M139n5awHxYGYcwcWA-CTY)"
agent-browser --session "list-1q34lBqlSq3M139n5awHxYGYcwcWA-CTY" open "https://drive.google.com/drive/folders/1q34lBqlSq3M139n5awHxYGYcwcWA-CTY" && sleep 5 && agent-browser --session "list-1q34lBqlSq3M139n5awHxYGYcwcWA-CTY" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1q34lBqlSq3M139n5awHxYGYcwcWA-CTY.txt"
echo "Listing: Assets for Influencers (1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2)"
agent-browser --session "list-1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2" open "https://drive.google.com/drive/folders/1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2" && sleep 5 && agent-browser --session "list-1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2.txt"
echo "Listing: Attila Toth (1Bo056r4ob46Va5d49h-8iGXDw2Kxbqug)"
agent-browser --session "list-1Bo056r4ob46Va5d49h-8iGXDw2Kxbqug" open "https://drive.google.com/drive/folders/1Bo056r4ob46Va5d49h-8iGXDw2Kxbqug" && sleep 5 && agent-browser --session "list-1Bo056r4ob46Va5d49h-8iGXDw2Kxbqug" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1Bo056r4ob46Va5d49h-8iGXDw2Kxbqug.txt"
echo "Listing: Ayat Sleymann (1YakrcF2AJKjhdzpUICCx-GFLRxhr5F7-)"
agent-browser --session "list-1YakrcF2AJKjhdzpUICCx-GFLRxhr5F7-" open "https://drive.google.com/drive/folders/1YakrcF2AJKjhdzpUICCx-GFLRxhr5F7-" && sleep 5 && agent-browser --session "list-1YakrcF2AJKjhdzpUICCx-GFLRxhr5F7-" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1YakrcF2AJKjhdzpUICCx-GFLRxhr5F7-.txt"
echo "Listing: Battle of the Sexes (1HcTElN8Agy_kJotgZ80mZ_nZVXS4vpWh)"
agent-browser --session "list-1HcTElN8Agy_kJotgZ80mZ_nZVXS4vpWh" open "https://drive.google.com/drive/folders/1HcTElN8Agy_kJotgZ80mZ_nZVXS4vpWh" && sleep 5 && agent-browser --session "list-1HcTElN8Agy_kJotgZ80mZ_nZVXS4vpWh" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1HcTElN8Agy_kJotgZ80mZ_nZVXS4vpWh.txt"
echo "Listing: Ben Greenfield (bengreenfieldfitness) (10tkewlxK62784rBoTkkfO8SGzjeXPkhU)"
agent-browser --session "list-10tkewlxK62784rBoTkkfO8SGzjeXPkhU" open "https://drive.google.com/drive/folders/10tkewlxK62784rBoTkkfO8SGzjeXPkhU" && sleep 5 && agent-browser --session "list-10tkewlxK62784rBoTkkfO8SGzjeXPkhU" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_10tkewlxK62784rBoTkkfO8SGzjeXPkhU.txt"
echo "Listing: Bobby Rich (mrbobbyrich) (1Nb9Xpi6sQGG-JXRphNj4mQ7fOKwnHkmJ)"
agent-browser --session "list-1Nb9Xpi6sQGG-JXRphNj4mQ7fOKwnHkmJ" open "https://drive.google.com/drive/folders/1Nb9Xpi6sQGG-JXRphNj4mQ7fOKwnHkmJ" && sleep 5 && agent-browser --session "list-1Nb9Xpi6sQGG-JXRphNj4mQ7fOKwnHkmJ" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1Nb9Xpi6sQGG-JXRphNj4mQ7fOKwnHkmJ.txt"
echo "Listing: Brian Mazza (1Le7FXyOq4VFB4nUJkYKy7LKV83TwOCK9)"
agent-browser --session "list-1Le7FXyOq4VFB4nUJkYKy7LKV83TwOCK9" open "https://drive.google.com/drive/folders/1Le7FXyOq4VFB4nUJkYKy7LKV83TwOCK9" && sleep 5 && agent-browser --session "list-1Le7FXyOq4VFB4nUJkYKy7LKV83TwOCK9" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1Le7FXyOq4VFB4nUJkYKy7LKV83TwOCK9.txt"
echo "Listing: BRoll Clips (1CjEKnaQjpRnBXHHfGoP1Qoxj5mkuUfE9)"
agent-browser --session "list-1CjEKnaQjpRnBXHHfGoP1Qoxj5mkuUfE9" open "https://drive.google.com/drive/folders/1CjEKnaQjpRnBXHHfGoP1Qoxj5mkuUfE9" && sleep 5 && agent-browser --session "list-1CjEKnaQjpRnBXHHfGoP1Qoxj5mkuUfE9" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1CjEKnaQjpRnBXHHfGoP1Qoxj5mkuUfE9.txt"
echo "Listing: Brooke Yoakam (12093zV-eYhq3SrXyB2kkjd8JvqVc-r25)"
agent-browser --session "list-12093zV-eYhq3SrXyB2kkjd8JvqVc-r25" open "https://drive.google.com/drive/folders/12093zV-eYhq3SrXyB2kkjd8JvqVc-r25" && sleep 5 && agent-browser --session "list-12093zV-eYhq3SrXyB2kkjd8JvqVc-r25" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_12093zV-eYhq3SrXyB2kkjd8JvqVc-r25.txt"
echo "Listing: Carmel Rodriguez Photos (carmelrodriguezfit) (1USLj8O_0OscHBIGZJzdLeGKKm2ldXQSF)"
agent-browser --session "list-1USLj8O_0OscHBIGZJzdLeGKKm2ldXQSF" open "https://drive.google.com/drive/folders/1USLj8O_0OscHBIGZJzdLeGKKm2ldXQSF" && sleep 5 && agent-browser --session "list-1USLj8O_0OscHBIGZJzdLeGKKm2ldXQSF" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1USLj8O_0OscHBIGZJzdLeGKKm2ldXQSF.txt"
echo "Listing: Cassie Sumfest (1XQZrloIMByInCtljTUoVUnomqoArUHqg)"
agent-browser --session "list-1XQZrloIMByInCtljTUoVUnomqoArUHqg" open "https://drive.google.com/drive/folders/1XQZrloIMByInCtljTUoVUnomqoArUHqg" && sleep 5 && agent-browser --session "list-1XQZrloIMByInCtljTUoVUnomqoArUHqg" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1XQZrloIMByInCtljTUoVUnomqoArUHqg.txt"
echo "Listing: Charlie Hendrie (commando_charlie) COMMANDO (1f8OLveteRqsncgV82QWVn3nf7wtlFXKr)"
agent-browser --session "list-1f8OLveteRqsncgV82QWVn3nf7wtlFXKr" open "https://drive.google.com/drive/folders/1f8OLveteRqsncgV82QWVn3nf7wtlFXKr" && sleep 5 && agent-browser --session "list-1f8OLveteRqsncgV82QWVn3nf7wtlFXKr" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1f8OLveteRqsncgV82QWVn3nf7wtlFXKr.txt"
echo "Listing: Coach Mike G / Mike Guevara (mrdoitmoving) GBG10 (115HRUCFINFJuR8W24HVbDNMSuHB9aX0P)"
agent-browser --session "list-115HRUCFINFJuR8W24HVbDNMSuHB9aX0P" open "https://drive.google.com/drive/folders/115HRUCFINFJuR8W24HVbDNMSuHB9aX0P" && sleep 5 && agent-browser --session "list-115HRUCFINFJuR8W24HVbDNMSuHB9aX0P" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_115HRUCFINFJuR8W24HVbDNMSuHB9aX0P.txt"
echo "Listing: Corey Wadell (1ShgYiwPL5l7jHSlRnehm4dO4g0nbBvRe)"
agent-browser --session "list-1ShgYiwPL5l7jHSlRnehm4dO4g0nbBvRe" open "https://drive.google.com/drive/folders/1ShgYiwPL5l7jHSlRnehm4dO4g0nbBvRe" && sleep 5 && agent-browser --session "list-1ShgYiwPL5l7jHSlRnehm4dO4g0nbBvRe" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1ShgYiwPL5l7jHSlRnehm4dO4g0nbBvRe.txt"
echo "Listing: Cristina Cataman (1xaJAIyqLX9LgXfvimlddxdBwTrTLeSRZ)"
agent-browser --session "list-1xaJAIyqLX9LgXfvimlddxdBwTrTLeSRZ" open "https://drive.google.com/drive/folders/1xaJAIyqLX9LgXfvimlddxdBwTrTLeSRZ" && sleep 5 && agent-browser --session "list-1xaJAIyqLX9LgXfvimlddxdBwTrTLeSRZ" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1xaJAIyqLX9LgXfvimlddxdBwTrTLeSRZ.txt"
echo "Listing: David Beckham (1pjrhfUoCfIDT8skE2YZdW04c2-umohe5)"
agent-browser --session "list-1pjrhfUoCfIDT8skE2YZdW04c2-umohe5" open "https://drive.google.com/drive/folders/1pjrhfUoCfIDT8skE2YZdW04c2-umohe5" && sleep 5 && agent-browser --session "list-1pjrhfUoCfIDT8skE2YZdW04c2-umohe5" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1pjrhfUoCfIDT8skE2YZdW04c2-umohe5.txt"
echo "Listing: David Nurse (davidnursenba) (1I1jg0b_a5ydo9U5y6O10cweioYWn-cAV)"
agent-browser --session "list-1I1jg0b_a5ydo9U5y6O10cweioYWn-cAV" open "https://drive.google.com/drive/folders/1I1jg0b_a5ydo9U5y6O10cweioYWn-cAV" && sleep 5 && agent-browser --session "list-1I1jg0b_a5ydo9U5y6O10cweioYWn-cAV" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1I1jg0b_a5ydo9U5y6O10cweioYWn-cAV.txt"
echo "Listing: Demi Bagby (demibagby) (1eRPIOXZdAKWMT5cDCD7WT67elm3mwuNO)"
agent-browser --session "list-1eRPIOXZdAKWMT5cDCD7WT67elm3mwuNO" open "https://drive.google.com/drive/folders/1eRPIOXZdAKWMT5cDCD7WT67elm3mwuNO" && sleep 5 && agent-browser --session "list-1eRPIOXZdAKWMT5cDCD7WT67elm3mwuNO" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1eRPIOXZdAKWMT5cDCD7WT67elm3mwuNO.txt"
echo "Listing: Dr Darshan Shah (darshanshahmd) (17JvqlhJWMtBCmbgars_cRj_GwMPDTQtH)"
agent-browser --session "list-17JvqlhJWMtBCmbgars_cRj_GwMPDTQtH" open "https://drive.google.com/drive/folders/17JvqlhJWMtBCmbgars_cRj_GwMPDTQtH" && sleep 5 && agent-browser --session "list-17JvqlhJWMtBCmbgars_cRj_GwMPDTQtH" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_17JvqlhJWMtBCmbgars_cRj_GwMPDTQtH.txt"
echo "Listing: Dr Dawn Mussallem (1G2uQmW4u9_H9FUKPaVcprh1Ttu68_7Xp)"
agent-browser --session "list-1G2uQmW4u9_H9FUKPaVcprh1Ttu68_7Xp" open "https://drive.google.com/drive/folders/1G2uQmW4u9_H9FUKPaVcprh1Ttu68_7Xp" && sleep 5 && agent-browser --session "list-1G2uQmW4u9_H9FUKPaVcprh1Ttu68_7Xp" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1G2uQmW4u9_H9FUKPaVcprh1Ttu68_7Xp.txt"
echo "Listing: Dr James DiNicolantonio (drjamesdinic) (1qshFUVyvGgVC1zC1CA50H6UJszmQigjh)"
agent-browser --session "list-1qshFUVyvGgVC1zC1CA50H6UJszmQigjh" open "https://drive.google.com/drive/folders/1qshFUVyvGgVC1zC1CA50H6UJszmQigjh" && sleep 5 && agent-browser --session "list-1qshFUVyvGgVC1zC1CA50H6UJszmQigjh" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1qshFUVyvGgVC1zC1CA50H6UJszmQigjh.txt"
echo "Listing: Dr Jila Senemar (1-Y6CEBTMhOm2MNVpABJXTEqrdBphfI1-)"
agent-browser --session "list-1-Y6CEBTMhOm2MNVpABJXTEqrdBphfI1-" open "https://drive.google.com/drive/folders/1-Y6CEBTMhOm2MNVpABJXTEqrdBphfI1-" && sleep 5 && agent-browser --session "list-1-Y6CEBTMhOm2MNVpABJXTEqrdBphfI1-" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1-Y6CEBTMhOm2MNVpABJXTEqrdBphfI1-.txt"
echo "Listing: Dr Jim Green (1jzS3QXfUaJbvqde9RNFMz0LewqGI5nnF)"
agent-browser --session "list-1jzS3QXfUaJbvqde9RNFMz0LewqGI5nnF" open "https://drive.google.com/drive/folders/1jzS3QXfUaJbvqde9RNFMz0LewqGI5nnF" && sleep 5 && agent-browser --session "list-1jzS3QXfUaJbvqde9RNFMz0LewqGI5nnF" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1jzS3QXfUaJbvqde9RNFMz0LewqGI5nnF.txt"
echo "Listing: Dr Rhea Kotecha (1MpZv9A3vD4zq8SNvGZONJT31r_vjpId6)"
agent-browser --session "list-1MpZv9A3vD4zq8SNvGZONJT31r_vjpId6" open "https://drive.google.com/drive/folders/1MpZv9A3vD4zq8SNvGZONJT31r_vjpId6" && sleep 5 && agent-browser --session "list-1MpZv9A3vD4zq8SNvGZONJT31r_vjpId6" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1MpZv9A3vD4zq8SNvGZONJT31r_vjpId6.txt"
echo "Listing: Dr Roohi Jeelani (1Uz3wKaJBWnSw-0M9zD1qupXXQxwN3cQa)"
agent-browser --session "list-1Uz3wKaJBWnSw-0M9zD1qupXXQxwN3cQa" open "https://drive.google.com/drive/folders/1Uz3wKaJBWnSw-0M9zD1qupXXQxwN3cQa" && sleep 5 && agent-browser --session "list-1Uz3wKaJBWnSw-0M9zD1qupXXQxwN3cQa" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1Uz3wKaJBWnSw-0M9zD1qupXXQxwN3cQa.txt"
echo "Listing: Dr Suzanne Devkota (1omC3VhXWyVzLgmJuuTuFSfQjDtuxsFQK)"
agent-browser --session "list-1omC3VhXWyVzLgmJuuTuFSfQjDtuxsFQK" open "https://drive.google.com/drive/folders/1omC3VhXWyVzLgmJuuTuFSfQjDtuxsFQK" && sleep 5 && agent-browser --session "list-1omC3VhXWyVzLgmJuuTuFSfQjDtuxsFQK" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1omC3VhXWyVzLgmJuuTuFSfQjDtuxsFQK.txt"
echo "Listing: Dr Tania Elliot (1KXy2FI7gMr_JNHrWAbygKGjMu8p9wt4U)"
agent-browser --session "list-1KXy2FI7gMr_JNHrWAbygKGjMu8p9wt4U" open "https://drive.google.com/drive/folders/1KXy2FI7gMr_JNHrWAbygKGjMu8p9wt4U" && sleep 5 && agent-browser --session "list-1KXy2FI7gMr_JNHrWAbygKGjMu8p9wt4U" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1KXy2FI7gMr_JNHrWAbygKGjMu8p9wt4U.txt"
echo "Listing: Dr. Dale Stern (1MS3lmT4XtF20vYTdfqMnId5QtjjgwMV8)"
agent-browser --session "list-1MS3lmT4XtF20vYTdfqMnId5QtjjgwMV8" open "https://drive.google.com/drive/folders/1MS3lmT4XtF20vYTdfqMnId5QtjjgwMV8" && sleep 5 && agent-browser --session "list-1MS3lmT4XtF20vYTdfqMnId5QtjjgwMV8" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1MS3lmT4XtF20vYTdfqMnId5QtjjgwMV8.txt"
echo "Listing: Dustin Pederson (1nu-RX3BYU_ZdtAqdkXoN5J3DAEy2_HNa)"
agent-browser --session "list-1nu-RX3BYU_ZdtAqdkXoN5J3DAEy2_HNa" open "https://drive.google.com/drive/folders/1nu-RX3BYU_ZdtAqdkXoN5J3DAEy2_HNa" && sleep 5 && agent-browser --session "list-1nu-RX3BYU_ZdtAqdkXoN5J3DAEy2_HNa" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1nu-RX3BYU_ZdtAqdkXoN5J3DAEy2_HNa.txt"
echo "Listing: Dustin Poirier (1KaqkYOMZjHr80RaOhVyohIKJT6PcveUJ)"
agent-browser --session "list-1KaqkYOMZjHr80RaOhVyohIKJT6PcveUJ" open "https://drive.google.com/drive/folders/1KaqkYOMZjHr80RaOhVyohIKJT6PcveUJ" && sleep 5 && agent-browser --session "list-1KaqkYOMZjHr80RaOhVyohIKJT6PcveUJ" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1KaqkYOMZjHr80RaOhVyohIKJT6PcveUJ.txt"
echo "Listing: Assets for Influencers (1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2)"
agent-browser --session "list-1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2" open "https://drive.google.com/drive/folders/1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2" && sleep 5 && agent-browser --session "list-1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1wsip4G8YVP_1lS6y7jXQOivw7p4RLyq2.txt"
echo "Listing: Beckham Stack (Essentials + Longevity) (173fDrsiK9tRYDuHTwGimbUss1RG4NQmb)"
agent-browser --session "list-173fDrsiK9tRYDuHTwGimbUss1RG4NQmb" open "https://drive.google.com/drive/folders/173fDrsiK9tRYDuHTwGimbUss1RG4NQmb" && sleep 5 && agent-browser --session "list-173fDrsiK9tRYDuHTwGimbUss1RG4NQmb" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_173fDrsiK9tRYDuHTwGimbUss1RG4NQmb.txt"
echo "Listing: ESSENTIALS (18SSpukuG81Ubwy-Zr9n9QwjO7gDyCKVh)"
agent-browser --session "list-18SSpukuG81Ubwy-Zr9n9QwjO7gDyCKVh" open "https://drive.google.com/drive/folders/18SSpukuG81Ubwy-Zr9n9QwjO7gDyCKVh" && sleep 5 && agent-browser --session "list-18SSpukuG81Ubwy-Zr9n9QwjO7gDyCKVh" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_18SSpukuG81Ubwy-Zr9n9QwjO7gDyCKVh.txt"
echo "Listing: LONGEVITY (1JOr9M3NfHe-dBdgFYOAEV53TyBY1Cjga)"
agent-browser --session "list-1JOr9M3NfHe-dBdgFYOAEV53TyBY1Cjga" open "https://drive.google.com/drive/folders/1JOr9M3NfHe-dBdgFYOAEV53TyBY1Cjga" && sleep 5 && agent-browser --session "list-1JOr9M3NfHe-dBdgFYOAEV53TyBY1Cjga" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_1JOr9M3NfHe-dBdgFYOAEV53TyBY1Cjga.txt"
echo "Listing: Other B-Rolls (12SLUtIowggDjhbaqUE66Q9YkAD-F1Iy0)"
agent-browser --session "list-12SLUtIowggDjhbaqUE66Q9YkAD-F1Iy0" open "https://drive.google.com/drive/folders/12SLUtIowggDjhbaqUE66Q9YkAD-F1Iy0" && sleep 5 && agent-browser --session "list-12SLUtIowggDjhbaqUE66Q9YkAD-F1Iy0" eval "Array.from(document.querySelectorAll('[data-id]')).map(el => {
        const id = el.getAttribute('data-id');
        const text = el.innerText;
        const name = text.split('\\n')[0].trim();
        const html = el.innerHTML;
        const isFolder = html.includes('Folder') || html.includes('Carpeta') || el.querySelector('svg[aria-label*="Folder"]') !== null;
        if (id && name && id.length > 20) {
            return id + ' | ' + name + ' | ' + (isFolder ? 'Folder' : 'File');
        }
        return null;
    }).filter(x => x !== null).join('\\n')" > "clean_files_12SLUtIowggDjhbaqUE66Q9YkAD-F1Iy0.txt"
