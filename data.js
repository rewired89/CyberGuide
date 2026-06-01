// CyberGuide concept database
// Each concept: id, title, tags, chain[], blurb, detail, memory, examTip, facts[]

const SECTIONS = [
  {
    id: "foundations",
    icon: "🧱",
    title: "Foundations",
    subtitle: "How the internet actually works — before anything else",
    concepts: [

      {
        id: "osi-model",
        title: "OSI Model",
        tags: ["both"],
        chain: ["Your App", "Wraps the data", "7 layers down", "Physical wire", "Unwrapped at destination"],
        blurb: "The 7-layer rulebook every network device follows. Data goes down the layers to send, up the layers to receive.",
        detail: `Think of sending a letter. You write it (Layer 7), put it in an envelope (Layer 6), seal it (Layer 5), add a return address (Layer 4), add a destination city (Layer 3), put it in a postal bag (Layer 2), and hand it to a truck (Layer 1). The receiver does the reverse.\n\nThe 7 layers from top to bottom:\n• Layer 7 – Application: your apps (browser, email, Zoom)\n• Layer 6 – Presentation: formats/encrypts data (HTTPS, SSL)\n• Layer 5 – Session: starts/stops conversations\n• Layer 4 – Transport: TCP or UDP, adds port numbers\n• Layer 3 – Network: IP addresses, routing between networks\n• Layer 2 – Data Link: MAC addresses, moves data between nearby devices\n• Layer 1 – Physical: actual cables, radio waves, bits`,
        memory: `Mnemonic top→bottom: "All People Seem To Need Data Processing"\n(Application, Presentation, Session, Transport, Network, Data Link, Physical)\n\nOr bottom→top: "Please Do Not Throw Sausage Pizza Away"`,
        examTip: `Exam loves asking: "A switch operates at which layer?" → Layer 2. "A router?" → Layer 3. "What layer does SSL/TLS work at?" → Layer 6 (Presentation).`,
        facts: ["7 layers", "Layer 3 = IP", "Layer 4 = TCP/UDP", "Layer 2 = MAC", "Switch = L2", "Router = L3"]
      },

      {
        id: "tcp-ip",
        title: "TCP/IP",
        tags: ["both"],
        chain: ["Data to send", "Split into packets", "Each packet gets routed", "Reassembled at destination"],
        blurb: "The actual protocol the internet runs on. TCP makes sure everything arrives; IP decides the route.",
        detail: `TCP/IP is 4 layers (simpler than OSI, more practical):\n• Application: what your app does (HTTP, FTP, DNS)\n• Transport: TCP or UDP\n• Internet: IP addresses and routing\n• Network Access: the actual wire/wifi\n\n<strong>TCP vs UDP — the most tested thing:</strong>\nTCP = careful. It does a 3-way handshake (SYN → SYN-ACK → ACK), confirms every packet arrived, resends lost ones. Used for websites, files, email — anything where accuracy matters.\n\nUDP = fast. No handshake, no confirmation. Used for video calls, gaming, DNS — anything where speed matters more than perfection. A missed frame in a video is fine. A missed byte in a password is not.`,
        memory: `TCP = "Trust but Confirm Packets" — it checks everything.\nUDP = "Update Don't Pause" — it fires and forgets.\n\nHandshake: SYN = "hey!", SYN-ACK = "hey back!", ACK = "cool, let's go"`,
        examTip: `Exam favorite: TCP 3-way handshake steps in order. Also: which protocols use TCP vs UDP. HTTP=TCP, DNS=UDP (usually), VoIP=UDP.`,
        facts: ["TCP = reliable", "UDP = fast", "SYN→SYN-ACK→ACK", "TCP port 80 = HTTP", "UDP port 53 = DNS"]
      },

      {
        id: "ip-address",
        title: "IP Address",
        tags: ["net"],
        chain: ["Device joins network", "Needs an identity", "IP address assigned", "Router reads it", "Data finds the device"],
        blurb: "Every device's home address on a network. Routers use it to figure out where to send data.",
        detail: `IPv4 = 4 numbers, each 0–255, separated by dots. Example: 192.168.1.100\nThere are about 4 billion IPv4 addresses — we ran out. That's why NAT and IPv6 exist.\n\nIPv6 = 8 groups of hex numbers. Example: 2001:0db8:85a3::8a2e:0370:7334\n128 bits long — enough addresses for every grain of sand on Earth, several times over.\n\n<strong>Private vs Public:</strong>\nPrivate (inside your home/office network):\n• 10.0.0.0 – 10.255.255.255\n• 172.16.0.0 – 172.31.255.255\n• 192.168.0.0 – 192.168.255.255\n\nPublic: everything else — routable on the actual internet.\n\n<strong>Special addresses:</strong>\n127.0.0.1 = loopback ("myself" — used for testing)\n0.0.0.0 = unassigned / "any address"\n255.255.255.255 = broadcast (talk to everyone on the network)`,
        memory: `IP Address = your home address. Just like the post office needs your street address to deliver mail, routers need your IP to deliver data.\n\n192.168.x.x = almost always a home/office network (private).\n127.0.0.1 = talking to yourself.`,
        examTip: `Know the three private IP ranges cold. Know that 127.0.0.1 = loopback. Know IPv6 is 128 bits. Know NAT allows private IPs to reach the internet through one public IP.`,
        facts: ["IPv4 = 32 bits", "IPv6 = 128 bits", "127.0.0.1 = loopback", "192.168.x.x = private", "10.x.x.x = private"]
      },

      {
        id: "subnetting",
        title: "Subnetting",
        tags: ["net"],
        chain: ["One big network", "Subnet mask divides it", "Smaller networks created", "Devices in same subnet talk directly", "Cross-subnet needs a router"],
        blurb: "Breaking one big network into smaller pieces. Like dividing a building into departments — each has their own hallway.",
        detail: `A subnet mask tells you which part of an IP address is the "network" and which part is the "device".\n\nExample: IP 192.168.1.50, Mask 255.255.255.0\n→ Network part: 192.168.1 (the apartment building)\n→ Device part: 50 (your specific apartment)\n\n<strong>CIDR notation</strong> = shorthand for subnet masks:\n/24 = 255.255.255.0 → 256 total IPs, 254 usable\n/16 = 255.255.0.0 → 65,536 IPs\n/8 = 255.0.0.0 → 16 million IPs\n/30 = only 4 IPs (2 usable) — used for point-to-point links\n\nFirst IP in a range = network address (not usable)\nLast IP = broadcast address (not usable)\nEverything in between = usable for devices`,
        memory: `Subnet mask = fence around a neighborhood. 192.168.1.0/24 means the neighborhood is "192.168.1" and your house number is anything from 1-254.\n\nCIDR /24 = "24 bits locked in" = 256 addresses, 254 usable (first and last are reserved).`,
        examTip: `Know the common CIDR blocks: /24 (256), /25 (128), /26 (64), /27 (32), /28 (16). Always subtract 2 for usable hosts (network + broadcast reserved). This comes up constantly.`,
        facts: ["/24 = 254 hosts", "/25 = 126 hosts", "/30 = 2 hosts", "/8 = 16M hosts", "First IP = network", "Last IP = broadcast"]
      },

      {
        id: "dns",
        title: "DNS",
        tags: ["both"],
        chain: ["You type a name", "DNS looks it up", "Returns an IP address", "Your browser connects to that IP"],
        blurb: "The internet's phonebook. You ask for 'google.com', DNS tells you it's at 142.250.80.46. Your computer speaks IP, not names.",
        detail: `DNS = Domain Name System\n\nWhen you type a URL:\n1. Your computer checks its local DNS cache first\n2. Asks your router's DNS server\n3. If not found, asks a recursive resolver (like 8.8.8.8 = Google DNS)\n4. Resolver asks root servers → TLD servers (.com) → authoritative servers\n5. Gets the IP, caches it, returns it to you\n\n<strong>Key DNS record types (memorize these):</strong>\n• A record: domain → IPv4 address\n• AAAA record: domain → IPv6 address\n• CNAME: alias → another domain name\n• MX: where email for this domain goes\n• TXT: text info (used for spam verification — SPF, DKIM)\n• NS: which servers handle DNS for this domain\n• PTR: reverse lookup — IP → domain name\n\nDNS runs on UDP port 53 (usually). TCP port 53 for large responses.`,
        memory: `DNS = the phonebook of the internet. You know the name (google.com), it finds the number (IP address).\n\nA record = Address. AAAA = Address (IPv6, 4x bigger). MX = Mail eXchange. CNAME = nickname.`,
        examTip: `DNS port = 53 (UDP mostly). Record types come up a lot — especially A, AAAA, MX, CNAME, TXT. DNS poisoning/cache poisoning is a common attack (attacker puts fake IPs in DNS cache).`,
        facts: ["Port 53 UDP", "A = IPv4", "AAAA = IPv6", "MX = email", "CNAME = alias", "TTL = cache time"]
      },

      {
        id: "dhcp",
        title: "DHCP",
        tags: ["net"],
        chain: ["Device connects", "Broadcasts 'what's my IP?'", "DHCP server responds", "IP lease assigned", "Device can communicate"],
        blurb: "The automatic IP-giver. When your phone joins WiFi, it doesn't ask you for an IP address — DHCP assigns one automatically.",
        detail: `DHCP = Dynamic Host Configuration Protocol\n\nThe process is called DORA:\n• <strong>D</strong>iscover — new device broadcasts "anyone have an IP for me?"\n• <strong>O</strong>ffer — DHCP server says "I have 192.168.1.50 available"\n• <strong>R</strong>equest — device says "I'll take it!"\n• <strong>A</strong>cknowledge — server confirms "it's yours for X hours (lease time)"\n\nDHCP gives out:\n• IP address\n• Subnet mask\n• Default gateway (your router)\n• DNS server addresses\n\nWithout DHCP, every device would need manual IP configuration. DHCP makes this automatic.\n\nLease time = how long the device keeps that IP before renewing. Home networks: often 24 hours. Office networks: can be days.`,
        memory: `DHCP = the hotel front desk. You walk in (connect), they assign you a room (IP), tell you the wifi password (DNS), and tell you when checkout is (lease time). You don't pick the room — they pick it for you.`,
        examTip: `DORA steps in order — exam loves this. DHCP uses UDP port 67 (server) and 68 (client). A DHCP starvation attack floods the server with requests to exhaust its IP pool.`,
        facts: ["DORA process", "UDP port 67/68", "Assigns IP + mask + gateway + DNS", "Lease = temporary", "Scope = IP pool range"]
      },

      {
        id: "ports-protocols",
        title: "Ports & Protocols",
        tags: ["both"],
        chain: ["Data arrives at IP", "Port number selects the service", "Protocol rules the conversation", "App receives the data"],
        blurb: "IP gets data to the right building. The port number is the apartment number. The protocol is the language spoken.",
        detail: `Ports range 0–65535:\n• <strong>Well-known (0–1023)</strong>: standard services — you need to memorize these\n• Registered (1024–49151): assigned to apps by convention\n• Dynamic/ephemeral (49152–65535): temporary ports your computer uses when making outbound connections\n\n<strong>Critical ports to memorize:</strong>\n20/21 = FTP (file transfer — 21 control, 20 data)\n22 = SSH (secure remote access)\n23 = Telnet (old, insecure remote access)\n25 = SMTP (sending email)\n53 = DNS\n67/68 = DHCP\n80 = HTTP (web, unencrypted)\n110 = POP3 (receiving email, old)\n143 = IMAP (receiving email, modern)\n389 = LDAP (directory/Active Directory)\n443 = HTTPS (web, encrypted)\n445 = SMB (Windows file sharing)\n3389 = RDP (Windows Remote Desktop)\n`,
        memory: `Think of ports like TV channels. IP = your TV. Port 80 = the news channel (HTTP). Port 443 = premium news, encrypted (HTTPS). Port 22 = the "I need to fix this remotely" channel (SSH).\n\nHTTP 80 → HTTPS 443. SSH 22. RDP 3389. FTP 21. SMTP 25.`,
        examTip: `Port numbers are heavily tested. Especially: know which protocols are insecure (Telnet 23, FTP 21, HTTP 80) vs their secure replacements (SSH 22, SFTP 22, HTTPS 443). Also know which use TCP vs UDP.`,
        facts: ["HTTP=80", "HTTPS=443", "SSH=22", "DNS=53", "RDP=3389", "SMTP=25", "FTP=21/20", "DHCP=67/68"]
      },

      {
        id: "mac-address",
        title: "MAC Address",
        tags: ["net"],
        chain: ["Every network card made", "Burned-in unique ID", "Works at Layer 2", "Used on local network only", "IP handles the rest"],
        blurb: "The hardware address burned into every network card at the factory. Used to identify devices on the same local network segment.",
        detail: `MAC = Media Access Control address\nFormat: 6 pairs of hex digits — like AA:BB:CC:11:22:33\n\nFirst 3 pairs = OUI (Organizationally Unique Identifier) = the manufacturer's ID\nLast 3 pairs = the specific device number\n\n<strong>MAC vs IP:</strong>\nMAC = Layer 2, local network only, never leaves the local segment\nIP = Layer 3, routable across the entire internet\n\nWhen data crosses a router, the IP address stays the same but the MAC address changes at each hop (the router replaces it with its own MAC for the next segment).\n\n<strong>ARP (Address Resolution Protocol):</strong>\nTranslates IP addresses to MAC addresses on a local network. "Who has 192.168.1.1? Tell 192.168.1.50." — the device with that IP replies with its MAC address.`,
        memory: `MAC address = your fingerprint. Unique, born with it (technically you can spoof it, but that's another topic). It only works in your neighborhood (local network). Once data leaves, only the IP matters.\n\nARP = asking "who lives at this IP address?" on the local network.`,
        examTip: `ARP is a common exam topic — it resolves IPs to MACs. ARP poisoning/spoofing attack = attacker broadcasts fake ARP replies to redirect traffic through their machine (man-in-the-middle).`,
        facts: ["48 bits", "6 hex pairs", "First 3 = OUI (maker)", "Layer 2 only", "ARP = IP→MAC", "Can be spoofed"]
      },

      {
        id: "http-https",
        title: "HTTP & HTTPS",
        tags: ["both"],
        chain: ["Browser requests a page", "HTTP = plain text request", "HTTPS = encrypted request", "TLS handshake secures it", "Page delivered safely"],
        blurb: "HTTP is how browsers and servers talk. HTTPS is the same thing but with a TLS lock on it so nobody can read the conversation.",
        detail: `HTTP = HyperText Transfer Protocol. It's request/response: browser asks, server answers.\n\n<strong>HTTP methods you must know:</strong>\n• GET: fetch a resource (loading a page)\n• POST: send data to the server (submitting a form)\n• PUT: replace a resource entirely\n• PATCH: update part of a resource\n• DELETE: remove a resource\n• HEAD: like GET but only returns headers, not body\n\n<strong>HTTP status codes:</strong>\n• 200 = OK — it worked\n• 301/302 = Redirect\n• 400 = Bad Request (you sent something wrong)\n• 401 = Unauthorized (not logged in)\n• 403 = Forbidden (logged in but not allowed)\n• 404 = Not Found\n• 500 = Server Error (server broke)\n\n<strong>HTTPS:</strong>\nHTTP + TLS. The TLS handshake happens before any HTTP data is sent:\n1. Browser says hello + supported cipher suites\n2. Server sends its certificate\n3. Browser verifies the cert against trusted CAs\n4. Session key exchanged (asymmetric crypto)\n5. All further traffic encrypted with that session key (symmetric)\n\nHTTP = port 80. HTTPS = port 443.`,
        memory: `HTTP = shouting your order across a restaurant (everyone can hear). HTTPS = ordering through a private tube (only you and the kitchen know).\n\n401 = "Who are you?" (no login). 403 = "I know who you are, you're just not allowed." 404 = "I can't find it."`,
        examTip: `401 vs 403 is a classic exam trick. HTTPS uses TLS (not SSL — SSL is deprecated). Port 80 = HTTP, port 443 = HTTPS. HTTP is stateless — each request is independent unless cookies/sessions are used.`,
        facts: ["HTTP=port 80", "HTTPS=port 443", "401=unauth", "403=forbidden", "404=not found", "TLS secures HTTPS", "Stateless protocol"]
      },

      {
        id: "tcp-udp-ports-detail",
        title: "TCP vs UDP — When Each Is Used",
        tags: ["net"],
        chain: ["Application picks a transport", "TCP = accuracy needed", "UDP = speed needed", "Port number added", "Data sent"],
        blurb: "TCP checks every delivery. UDP fires and forgets. The choice depends on whether losing a packet matters more than the delay of re-checking.",
        detail: `<strong>TCP (Transmission Control Protocol):</strong>\nConnection-oriented. Before data flows, a 3-way handshake establishes the connection:\n→ SYN (client: "want to talk?")\n→ SYN-ACK (server: "sure, ready")\n→ ACK (client: "great, starting now")\n\nAfter transfer, a 4-way teardown closes it (FIN, FIN-ACK, ACK).\n\nFeatures: guaranteed delivery, ordering, error correction, flow control, congestion control. Slower because of all this overhead.\n\nUse TCP for: web (HTTP/HTTPS), email (SMTP/IMAP), file transfer (FTP), SSH.\n\n<strong>UDP (User Datagram Protocol):</strong>\nConnectionless. No handshake. Just send. No confirmation.\n\nFeatures: fast, lightweight, no overhead. If a packet drops, it's gone.\n\nUse UDP for: DNS (quick lookup), video streaming, VoIP (voice calls), gaming, NTP (time sync), TFTP, SNMP.\n\n<strong>Both TCP and UDP:</strong>\n• DNS: usually UDP (fast lookups), but TCP when response is too large\n• LDAP: both (389 TCP, but also UDP)\n• SIP (VoIP signaling): both`,
        memory: `TCP = registered mail with signature confirmation. Slower, guaranteed.\nUDP = dropping a flyer in someone's mailbox. Fast, no confirmation, some may not arrive.\n\nVoice calls (VoIP) = UDP. A missing millisecond of audio is fine. A missing byte of your SSH session is catastrophic.`,
        examTip: `SYN flood attack = attacker sends thousands of SYNs, never completes handshake, exhausts server's connection table (DoS). DNS uses UDP 53 normally, TCP 53 for zone transfers or large responses. TFTP = UDP 69.`,
        facts: ["TCP=reliable", "UDP=fast", "SYN/SYN-ACK/ACK", "FTP=TCP", "DNS=UDP 53", "VoIP=UDP", "SYN flood=DoS"]
      },

      {
        id: "network-address-types",
        title: "Unicast, Broadcast, Multicast, Anycast",
        tags: ["net"],
        chain: ["Data needs to reach", "One device (unicast)", "All devices (broadcast)", "A group (multicast)", "Nearest of a group (anycast)"],
        blurb: "Four ways to address network traffic — who gets the message. Most of your traffic is unicast (one to one).",
        detail: `<strong>Unicast:</strong>\nOne sender → one specific receiver. The most common type. Your computer loading a webpage = unicast.\n\n<strong>Broadcast:</strong>\nOne sender → every device on the subnet. Used by: ARP ("who has this IP?"), DHCP discovery. Broadcast address = last IP in subnet (e.g., 192.168.1.255 for /24). Broadcasts don't cross routers — they stay in their subnet.\n\n<strong>Multicast:</strong>\nOne sender → a group of interested receivers. Like a cable TV channel — only devices that "subscribe" receive it. Used by: video streaming (IPTV), routing protocols (OSPF uses 224.0.0.5), some VoIP.\nMulticast IP range: 224.0.0.0 – 239.255.255.255\n\n<strong>Anycast:</strong>\nOne sender → nearest receiver in a group. The same IP is announced from multiple locations; routing sends you to the closest one. Used by: CDNs, DNS root servers, Cloudflare's 1.1.1.1.\n\n<strong>Summary:</strong>\nUnicast = 1→1. Broadcast = 1→all. Multicast = 1→many (opt-in). Anycast = 1→nearest.`,
        memory: `Unicast = calling one person. Broadcast = yelling in a room. Multicast = a group text (only members of the group get it). Anycast = calling customer support and getting routed to the nearest agent.`,
        examTip: `Broadcast stays within a subnet (routers block it). Multicast range = 224-239.x.x.x. Anycast is how modern DNS services (1.1.1.1, 8.8.8.8) route you to the nearest server. IPv6 replaced broadcast with multicast entirely.`,
        facts: ["Unicast=1→1", "Broadcast=1→all", "Multicast=1→group", "Anycast=1→nearest", "Broadcast stays in subnet", "Multicast=224-239.x.x.x"]
      },

    ]
  },

  {
    id: "network-plus",
    icon: "🌐",
    title: "Network+ (N10-009)",
    subtitle: "Networking fundamentals — routers, switches, protocols, troubleshooting",
    concepts: [

      {
        id: "osi-layers-devices",
        title: "Network Devices by OSI Layer",
        tags: ["net"],
        chain: ["Data enters network", "Device processes at its layer", "Moves to next device", "Arrives at destination"],
        blurb: "Different devices work at different OSI layers. Knowing which device does what at which layer is one of the most tested topics.",
        detail: `<strong>Layer 1 – Physical:</strong>\n• Hub: dumbest device. Gets data on one port, blasts it out every other port. No intelligence.\n• Repeater: amplifies a signal so it travels farther.\n• Cables, fiber, NICs.\n\n<strong>Layer 2 – Data Link:</strong>\n• Switch: smart hub. Learns which MAC address is on which port. Sends data only to the right port.\n• Bridge: connects two network segments at Layer 2.\n• Wireless Access Point (WAP): translates between wired Ethernet and Wi-Fi.\n\n<strong>Layer 3 – Network:</strong>\n• Router: routes packets between different networks using IP addresses. Your home router connects your local network to the internet.\n• Layer 3 switch: a switch that can also route (has some router features).\n\n<strong>Layer 4–7 – Upper layers:</strong>\n• Firewall: usually Layer 4 (packet filtering) but modern ones work up to Layer 7.\n• Load balancer: Layer 4 or 7, distributes traffic across multiple servers.\n• Proxy server: Layer 7, intermediary between clients and servers.`,
        memory: `Hub = sprinkler (waters everything). Switch = targeted water gun (goes exactly where needed). Router = GPS (routes between different places).\n\nSwitch = Layer 2 (uses MACs). Router = Layer 3 (uses IPs). Firewall = Layer 3-4+ (filters traffic).`,
        examTip: `"Which device operates at Layer 2?" → Switch. "Layer 3?" → Router. "Which device creates collision domains?" → Hub (all ports, one collision domain). Switches = each port is its own collision domain.`,
        facts: ["Hub=L1", "Switch=L2", "Router=L3", "Firewall=L3/4", "WAP=L2", "Load balancer=L4/7"]
      },

      {
        id: "vlan",
        title: "VLAN",
        tags: ["net"],
        chain: ["One physical switch", "Virtual walls created", "Groups of ports isolated", "Traffic stays in its VLAN", "Router needed to cross VLANs"],
        blurb: "Virtual LANs let you split one physical switch into multiple isolated networks. HR and Engineering on the same switch, but can't see each other.",
        detail: `VLAN = Virtual Local Area Network\n\nWithout VLANs: everything on a switch can talk to everything else. One broadcast goes to every device.\n\nWith VLANs: you tag ports with a VLAN ID. Devices in VLAN 10 can't see VLAN 20. Broadcasts stay inside their VLAN.\n\n<strong>VLAN tagging (802.1Q):</strong>\nWhen data travels between switches, it needs to keep its VLAN ID. 802.1Q adds a 4-byte tag to frames with the VLAN number.\n\n<strong>Trunk port vs Access port:</strong>\n• Access port: connects to a device (PC, printer). Belongs to ONE VLAN. No VLAN tag visible to the device.\n• Trunk port: connects two switches together. Carries MULTIPLE VLANs. All frames are tagged with 802.1Q.\n\n<strong>Native VLAN:</strong>\nThe one VLAN that travels untagged on a trunk. Default is VLAN 1. Security risk — keep it something nobody uses.`,
        memory: `VLANs = office floors. Same building (switch), different floors (VLANs). To get between floors you need an elevator (router). Access port = your desk plug. Trunk port = the elevator shaft carrying everyone.`,
        examTip: `802.1Q = VLAN tagging standard. Trunk port = multiple VLANs, tagged. Access port = one VLAN, untagged. Inter-VLAN routing requires a router or Layer 3 switch. VLAN 1 as native VLAN is a security weakness.`,
        facts: ["802.1Q = tagging", "Access = 1 VLAN", "Trunk = multiple", "VLAN 1 = default (avoid)", "Inter-VLAN = needs router", "Broadcast stays local"]
      },

      {
        id: "routing",
        title: "Routing & Routing Protocols",
        tags: ["net"],
        chain: ["Packet needs to reach destination", "Router checks routing table", "Best path selected", "Forwarded to next hop", "Repeated until destination reached"],
        blurb: "Routers read IP addresses and decide where to send packets next. Routing protocols let routers learn about the network automatically.",
        detail: `A routing table = the router's GPS. It lists known networks and which interface (or next-hop IP) to use to reach them.\n\n<strong>Static vs Dynamic routing:</strong>\nStatic: an admin manually adds routes. Simple, predictable, no overhead. Bad for large/changing networks.\nDynamic: routers share info with each other and auto-update routes. Adapts to failures.\n\n<strong>Key routing protocols:</strong>\n• RIP (Routing Information Protocol): old, simple, measures distance in hops (max 15). Slow to converge.\n• OSPF (Open Shortest Path First): popular, uses "cost" based on bandwidth. Fast convergence. Link-state.\n• EIGRP (Enhanced Interior Gateway Routing Protocol): Cisco's protocol. Hybrid. Fast.\n• BGP (Border Gateway Protocol): the glue of the internet. Routers at ISPs use it to route between major networks (autonomous systems).\n\n<strong>Administrative Distance (AD):</strong>\nWhen multiple routes exist, AD determines which is most trusted:\nConnected=0, Static=1, EIGRP=90, OSPF=110, RIP=120`,
        memory: `Router = GPS. Routing table = the map. RIP counts roads (hops). OSPF calculates fastest road (bandwidth). BGP = the highways connecting entire cities (internet backbone).`,
        examTip: `Default Gateway = your router's IP on your local network. Without it, your device can only talk to devices on the same subnet. RIP max hops = 15. OSPF uses "cost." BGP = runs the internet. AD: lower = more trusted.`,
        facts: ["Gateway = router IP", "RIP max 15 hops", "OSPF = link-state", "BGP = internet backbone", "AD: lower = better", "Convergence = all agree"]
      },

      {
        id: "nat",
        title: "NAT / PAT",
        tags: ["net"],
        chain: ["Private IP wants internet access", "NAT translates it to public IP", "Traffic goes out", "Reply comes back to public IP", "NAT translates back to private IP"],
        blurb: "NAT lets thousands of devices share one public IP address. Your home has one public IP — NAT gives all your devices internet access.",
        detail: `NAT = Network Address Translation\nPAT = Port Address Translation (also called NAT Overload)\n\n<strong>Why it exists:</strong> We ran out of IPv4 addresses. Instead of every device needing a public IP, your router gets one public IP and translates for everyone inside.\n\n<strong>How PAT works:</strong>\nDevice 192.168.1.50:3000 → Router translates → 203.0.113.1:40001\nDevice 192.168.1.51:3000 → Router translates → 203.0.113.1:40002\nEach internal device gets a unique PORT on the same public IP. Router keeps a translation table.\n\n<strong>Types of NAT:</strong>\n• Static NAT: one private IP ↔ one public IP. Used for servers that need to be reachable from outside.\n• Dynamic NAT: pool of public IPs, assigned as needed.\n• PAT (NAT Overload): many private IPs → one public IP, differentiated by port. Most common.\n\n<strong>NAT limitations:</strong>\nBreaks end-to-end connectivity. Some protocols don't work well through NAT. IPv6 was supposed to eliminate the need for it.`,
        memory: `NAT = apartment building with one street address. The building has hundreds of units, but mail all comes to one address (public IP). The doorman (NAT) knows which unit to deliver to based on who sent what (port tracking).`,
        examTip: `PAT = NAT Overload = most common form. It uses PORT numbers to distinguish between internal devices. Static NAT = one-to-one mapping (for servers). NAT breaks IPsec unless NAT-T (NAT Traversal) is used.`,
        facts: ["PAT = NAT Overload", "One public IP → many private", "Uses port numbers", "Translation table kept", "Static NAT = 1:1", "IPv6 doesn't need NAT"]
      },

      {
        id: "wireless",
        title: "Wireless Networking (Wi-Fi)",
        tags: ["net"],
        chain: ["Wireless card sends radio signal", "Access point receives it", "Connects to wired network", "Standards define speed & frequency"],
        blurb: "Wi-Fi is just networking over radio waves instead of cables. Different 802.11 standards define the speed, range, and frequency used.",
        detail: `All Wi-Fi standards are 802.11 (the IEEE standard):\n\n<strong>Key standards:</strong>\n• 802.11a: 5 GHz, 54 Mbps. Old.\n• 802.11b: 2.4 GHz, 11 Mbps. Old, short range.\n• 802.11g: 2.4 GHz, 54 Mbps. Backward compatible with b.\n• 802.11n (Wi-Fi 4): 2.4/5 GHz, up to 600 Mbps. MIMO introduced.\n• 802.11ac (Wi-Fi 5): 5 GHz, up to 3.5 Gbps. MU-MIMO.\n• 802.11ax (Wi-Fi 6): 2.4/5/6 GHz, up to 9.6 Gbps. OFDMA. Best for dense environments.\n\n<strong>2.4 GHz vs 5 GHz:</strong>\n2.4 GHz = longer range, slower, more crowded (microwaves, neighbors' routers all use it)\n5 GHz = shorter range, faster, less interference\n\n<strong>Channels:</strong>\n2.4 GHz has 11 channels, but only 3 don't overlap: 1, 6, 11\n\n<strong>Security:</strong>\nWEP = broken, never use\nWPA = weak, don't use\nWPA2 = current standard (AES encryption)\nWPA3 = newest, stronger, use when available`,
        memory: `Wi-Fi generations: a/b/g/n/ac/ax = "A Big Goat Named Ace Axed things." a=5GHz, b=2.4, g=2.4, n=both, ac=5GHz fast, ax=Wi-Fi 6.\n\nNon-overlapping 2.4GHz channels: 1, 6, 11 — just those three.`,
        examTip: `WPA2 uses AES encryption (strong). WPA uses TKIP (weaker). WEP is completely broken — RC4 cipher with flaws. Non-overlapping 2.4GHz channels: 1, 6, 11. 802.11ac = 5GHz only. 802.11ax (Wi-Fi 6) = all bands.`,
        facts: ["WPA2=AES", "WEP=broken", "Channels 1/6/11", "2.4GHz=range", "5GHz=speed", "802.11ax=Wi-Fi 6"]
      },

      {
        id: "spanning-tree",
        title: "Spanning Tree Protocol (STP)",
        tags: ["net"],
        chain: ["Redundant switch links added", "Loops would destroy network", "STP detects loops", "Blocks redundant ports", "Loop-free path maintained"],
        blurb: "Switches with redundant links would create infinite loops and melt your network. STP prevents that by automatically blocking the extra paths.",
        detail: `Without STP: if you connect two switches with two cables for redundancy, broadcast frames loop forever between them, consuming all bandwidth in seconds. This is a broadcast storm.\n\nSTP solves this by electing a Root Bridge and blocking ports that would create loops, keeping only one active path between any two switches.\n\n<strong>STP process:</strong>\n1. Elect a Root Bridge (switch with lowest Bridge ID = priority + MAC address)\n2. Every other switch finds its best path to the Root Bridge (Root Port)\n3. On each network segment, the switch with the best path becomes Designated Port\n4. All other ports = Blocked (no data, just listens)\n\n<strong>STP port states:</strong>\nBlocking → Listening → Learning → Forwarding\n(Takes 30-50 seconds to converge — very slow)\n\n<strong>Modern versions:</strong>\n• RSTP (Rapid STP / 802.1w): converges in seconds instead of 30-50s\n• MSTP (Multiple STP / 802.1s): separate spanning tree per VLAN group\n• PVST+ (Cisco's Per-VLAN STP): one spanning tree per VLAN`,
        memory: `STP = the network's traffic cop who closes off extra roads to prevent traffic circles. One main road to the Root Bridge, all other paths closed unless needed.\n\nRoot Bridge = the boss switch. Lowest priority number wins (counter-intuitive — lower is "better").`,
        examTip: `Bridge ID = priority (default 32768) + MAC address. Lowest Bridge ID = Root Bridge. RSTP = 802.1w (rapid). Classic STP = 802.1d. PortFast = skip the slow STP states for end devices (never on switch-to-switch links). BPDU Guard = shut port if STP BPDUs received on PortFast port.`,
        facts: ["802.1d=classic STP", "802.1w=RSTP(fast)", "Root Bridge=lowest ID", "Blocks redundant ports", "PortFast=end devices", "BPDU Guard=protects"]
      },

      {
        id: "dns-deep",
        title: "DNS — How Resolution Actually Works",
        tags: ["net"],
        chain: ["You type google.com", "Check local cache", "Ask recursive resolver", "Resolver asks root → TLD → authoritative", "IP returned and cached"],
        blurb: "DNS resolution is a chain of questions between servers. Understanding the full path matters for both the exam and real troubleshooting.",
        detail: `<strong>Full DNS resolution path:</strong>\n1. Check browser cache\n2. Check OS cache (hosts file first, then DNS cache)\n3. Ask your configured DNS server (usually your router, ISP, or 8.8.8.8)\n4. That server (recursive resolver) checks its cache\n5. If not cached, resolver asks a Root Name Server (there are 13 root server clusters worldwide)\n6. Root says "for .com, ask these TLD servers"\n7. Resolver asks the .com TLD server\n8. TLD says "for google.com, ask Google's name servers"\n9. Resolver asks Google's authoritative name server\n10. Gets the A record (IP address)\n11. Returns it to you, caches it with TTL\n\n<strong>Hosts file:</strong>\nA local file that maps names to IPs BEFORE DNS is consulted. /etc/hosts on Linux/Mac, C:\\Windows\\System32\\drivers\\etc\\hosts on Windows. Attackers sometimes modify it to redirect traffic.\n\n<strong>DNS over HTTPS (DoH) and DNS over TLS (DoT):</strong>\nEncrypt DNS queries so your ISP/network can't see what domains you're looking up. Privacy improvement.\n\n<strong>DNSSEC:</strong>\nAdds digital signatures to DNS records. Prevents DNS cache poisoning by verifying records came from the real authoritative server.`,
        memory: `DNS resolution = asking for directions. You ask your local friend (resolver). They ask the city hall (root). City hall says "ask the street department for .com streets" (TLD). Street dept says "ask that building's office" (authoritative). That office gives you the exact room number (IP).`,
        examTip: `TTL (Time to Live) = how long DNS answers are cached. Low TTL = change propagates fast but more DNS traffic. Hosts file overrides DNS — malware modifying it redirects you to fake sites. DNSSEC protects integrity of DNS responses. DoH/DoT = encrypted DNS (privacy).`,
        facts: ["13 root server clusters", "Recursive resolver asks all", "TTL=cache duration", "Hosts file overrides", "DNSSEC=signed records", "DoH=DNS over HTTPS"]
      },

      {
        id: "network-topologies",
        title: "Network Topologies",
        tags: ["net"],
        chain: ["Devices need to connect", "Physical layout chosen", "Logical paths defined", "Determines failure impact & performance"],
        blurb: "The shape of a network — how devices are physically and logically connected to each other.",
        detail: `<strong>Physical topologies (how cables actually run):</strong>\n• Star: all devices connect to a central switch/hub. Most common today. One device fails → others fine. Switch fails → everything down.\n• Bus: all devices on one long cable. Old. One break = whole network down.\n• Ring: each device connects to two others in a loop. Token Ring. Old.\n• Mesh: every device connects to every other device. Extremely redundant. Used in WANs and critical infrastructure.\n• Hybrid: combo of the above. Enterprise networks.\n\n<strong>Logical topologies (how data actually flows):</strong>\nLogical topology can differ from physical. An Ethernet star network is logically a bus.\n\n<strong>Common in real life:</strong>\nSmall office = star (all to a switch)\nInternet backbone = partial mesh (ISPs interconnected)\nHome = star (all to router)\nData center = partial mesh + redundant paths\n\n<strong>Full mesh vs partial mesh:</strong>\nFull mesh: every node connects to every other = n*(n-1)/2 links. Very redundant, very expensive.\nPartial mesh: some nodes have multiple connections = compromise.`,
        memory: `Star = bicycle wheel (hub in center, spokes out). Bus = clothesline (everything on one line). Mesh = fishing net (everything connected to multiple others). Star is what you have at home.`,
        examTip: `Star topology = most common in modern networks. Single point of failure = the central switch. Bus topology = one break kills the whole network. Full mesh = maximum redundancy. Partial mesh = compromise.`,
        facts: ["Star = most common", "Bus = one cable", "Ring = loop", "Mesh = all connected", "Full mesh: n(n-1)/2", "Star SPOF = switch"]
      },

      {
        id: "firewalls",
        title: "Firewalls",
        tags: ["both"],
        chain: ["Traffic wants to enter network", "Firewall checks rules", "Allowed or blocked", "Logs the decision", "Network protected"],
        blurb: "The gatekeeper between networks. Checks every packet against a ruleset and decides: let it through or drop it.",
        detail: `<strong>Types of firewalls:</strong>\n\n• Packet filtering (stateless): Looks at each packet individually — source IP, dest IP, port, protocol. Fast, simple, dumb. Doesn't know if a packet is part of a legitimate conversation.\n\n• Stateful inspection: Tracks the STATE of connections. Knows if an incoming packet belongs to a connection that was legitimately opened. Much smarter. Standard in most firewalls today.\n\n• Application/NGFW (Next-Gen Firewall): Works up to Layer 7. Can inspect HTTP content, block specific apps, detect malware in traffic. Deep Packet Inspection (DPI).\n\n• Proxy firewall: Acts as an intermediary. Requests go to the proxy, not directly to the server. Good privacy/inspection but adds latency.\n\n• WAF (Web Application Firewall): Specifically protects web apps. Blocks SQLi, XSS, etc. Operates at Layer 7.\n\n<strong>Implicit deny:</strong>\nThe golden rule: whatever isn't explicitly allowed is denied. Rules are processed top to bottom. First match wins.`,
        memory: `Stateless firewall = bouncer who just checks your ID matches a list. Stateful firewall = bouncer who remembers you came in earlier and expects you to leave. NGFW = bouncer who reads your lips and knows what you're saying inside.`,
        examTip: `Stateful vs stateless is heavily tested. Stateful = tracks connection state. "Implicit deny" at the end of rule lists — anything not explicitly allowed is blocked. NGFW = Layer 7 inspection. WAF = web app specific.`,
        facts: ["Stateless = per-packet", "Stateful = tracks sessions", "NGFW = Layer 7", "WAF = web apps", "Implicit deny", "Rules: top-down, first match"]
      },

      {
        id: "ids-ips",
        title: "IDS & IPS",
        tags: ["both"],
        chain: ["Traffic flows through network", "IDS watches and alerts", "IPS watches and blocks", "Signatures vs anomalies detected", "Incident recorded or prevented"],
        blurb: "IDS = security camera (sees intrusions, tells you). IPS = security guard (sees intrusions, stops them). One alerts, one acts.",
        detail: `<strong>IDS (Intrusion Detection System):</strong>\nPassively monitors traffic and logs/alerts on suspicious activity. Does NOT block. It's out-of-band — traffic doesn't pass through it, it just sees a copy.\nIf you want speed without blocking risk, use IDS.\n\n<strong>IPS (Intrusion Prevention System):</strong>\nSits inline — ALL traffic passes through it. Actively blocks malicious traffic in real time. If it fails (hardware failure), it can drop all traffic (fail-closed) or let everything through (fail-open).\n\n<strong>Detection methods:</strong>\n• Signature-based: matches traffic against known attack patterns. Fast, low false positives, BUT can't detect new/unknown attacks (zero-days).\n• Anomaly-based: builds a baseline of "normal" traffic, alerts on deviations. Catches new attacks BUT higher false positive rate.\n• Heuristic/Behavioral: like anomaly but uses rules about behavior, not just statistics.\n\n<strong>Placement:</strong>\nIDS/IPS commonly sits at the network perimeter (after the firewall) to catch what the firewall misses. Host-based versions (HIDS/HIPS) run on individual machines.\n\n<strong>False positives vs false negatives:</strong>\nFalse positive = alert on legitimate traffic (annoying, wastes time)\nFalse negative = misses actual attack (dangerous)`,
        memory: `IDS = smoke detector (beeps, doesn't spray water). IPS = smoke detector + sprinkler (beeps AND sprays). Signature = known criminal's mugshot. Anomaly = someone acting weird even without a mugshot.`,
        examTip: `IDS is passive/out-of-band. IPS is inline/active. Signature-based can't catch zero-days. Anomaly-based has more false positives. NIDS = network-based. HIDS = host-based (runs on the endpoint). SIEM collects logs from IDS/IPS and correlates them.`,
        facts: ["IDS=passive/alerts", "IPS=active/blocks", "Signature=known attacks", "Anomaly=baseline deviation", "HIDS=host-based", "False neg=dangerous"]
      },

      {
        id: "dmz",
        title: "DMZ (Demilitarized Zone)",
        tags: ["both"],
        chain: ["Internet = dangerous", "Internal network = protected", "DMZ = buffer zone between them", "Public-facing servers live here", "Compromise here doesn't reach internals"],
        blurb: "A separate network segment between your firewall and the internet. Web servers, email servers, public-facing stuff goes here — isolated from your internal network.",
        detail: `The DMZ is a semi-trusted zone. It's more exposed than your internal network but more protected than the raw internet.\n\n<strong>Why it matters:</strong>\nIf your web server gets compromised, an attacker in the DMZ can't directly reach internal systems like databases, HR files, or domain controllers. They're isolated.\n\n<strong>Common DMZ architecture (dual firewall):</strong>\nInternet → [Firewall 1] → DMZ → [Firewall 2] → Internal Network\n\nThe outer firewall allows inbound traffic to the DMZ on specific ports (80, 443).\nThe inner firewall only allows traffic from DMZ to internal on specific needed ports.\n\n<strong>What lives in a DMZ:</strong>\n• Web servers (public website)\n• Email servers (receiving inbound email)\n• DNS servers (public-facing)\n• VPN concentrators\n• Reverse proxies\n\n<strong>What should NOT be in a DMZ:</strong>\n• Domain controllers\n• Databases with sensitive data\n• Internal application servers\n\n<strong>Screened subnet:</strong>\nAnother name for DMZ. One firewall with 3 interfaces: external, DMZ, internal.`,
        memory: `DMZ = the lobby of a secure building. Visitors (internet traffic) can enter the lobby (DMZ), but they can't get into the offices (internal network) without additional access. Your web server is the receptionist in the lobby.`,
        examTip: `DMZ = screened subnet = semi-trusted network. Dual-firewall DMZ is more secure than single-firewall (3-legged) DMZ. Web/email/VPN servers go in DMZ. Databases should NEVER be in the DMZ — only the app server that fronts them.`,
        facts: ["DMZ=screened subnet", "Semi-trusted zone", "Public servers go here", "Dual firewall=more secure", "DB not in DMZ", "Contains breach impact"]
      },

      {
        id: "vpn",
        title: "VPN",
        tags: ["both"],
        chain: ["Traffic needs to travel over public internet", "VPN creates encrypted tunnel", "Data travels encrypted", "Decrypted at destination", "Private connection over public network"],
        blurb: "A private, encrypted tunnel through the public internet. Makes it safe to connect to your office from a coffee shop.",
        detail: `VPN = Virtual Private Network\n\n<strong>Types of VPN:</strong>\n• Site-to-site VPN: Connects two entire networks (like headquarters and branch office). Always-on. Users don't have to do anything.\n• Remote access VPN (client VPN): Individual user connects to the corporate network from anywhere. Client software on their device.\n• Split tunneling: Only corporate traffic goes through the VPN. Personal traffic goes directly to internet. More efficient.\n• Full tunnel: ALL traffic goes through VPN, including personal browsing. More secure, more bandwidth use.\n\n<strong>VPN Protocols:</strong>\n• IPsec: Standard. Operates at Layer 3. Encrypts entire IP packets. Two modes: Transport (encrypts payload) and Tunnel (encrypts entire packet).\n• SSL/TLS VPN: Uses HTTPS. Works in browsers. Easier to set up, no special client needed. Works through firewalls that block IPsec.\n• OpenVPN: Open-source, uses TLS. Popular for remote access.\n• WireGuard: Modern, fast, simple. Gaining popularity.\n• PPTP: Old and broken. Never use.\n• L2TP/IPsec: L2TP for tunneling + IPsec for encryption. Solid but being replaced.`,
        memory: `VPN = a secret underground tunnel under a public street. Anyone can see you went into the entrance, but nobody can see where you're going or what you're carrying.\n\nIPsec = industrial-strength tunnel. SSL VPN = browser-based tunnel you can use from any computer.`,
        examTip: `IPsec uses IKE for key exchange. Transport mode = encrypts payload. Tunnel mode = encrypts whole packet (including IP header) — used for site-to-site. SSL VPN uses port 443 = passes through most firewalls. PPTP = weak, avoid.`,
        facts: ["IPsec=L3", "SSL VPN=port 443", "Split tunnel", "Transport vs Tunnel mode", "IKE = key exchange", "PPTP = insecure"]
      },

    ]
  },

  {
    id: "security-plus",
    icon: "🔐",
    title: "Security+ (SY0-701)",
    subtitle: "Core security concepts, threats, architecture, operations",
    concepts: [

      {
        id: "cia-triad",
        title: "CIA Triad",
        tags: ["sec"],
        chain: ["Data is an asset", "Must be kept secret (C)", "Must stay unchanged (I)", "Must be available when needed (A)", "Security = protecting all three"],
        blurb: "The three goals of every security control: Confidentiality, Integrity, Availability. Every attack violates at least one of these.",
        detail: `The CIA Triad is the foundation of cybersecurity. Every security decision maps back to it.\n\n<strong>Confidentiality:</strong>\nOnly authorized people can see the data. Achieved with: encryption, access controls, authentication.\nAttacks against it: eavesdropping, man-in-the-middle, data breach.\n\n<strong>Integrity:</strong>\nData is accurate and hasn't been tampered with. Achieved with: hashing, digital signatures, checksums.\nAttacks against it: data tampering, SQL injection, man-in-the-middle.\n\n<strong>Availability:</strong>\nSystems are up and accessible when needed. Achieved with: redundancy, backups, DDoS protection, failover.\nAttacks against it: DDoS, ransomware, physical destruction.\n\n<strong>Sometimes you have to trade off:</strong>\n"Full encryption at rest" protects Confidentiality but could hurt Availability (can't access data if key is lost). Security is about finding the right balance for your risk.`,
        memory: `CIA = a three-legged stool. Remove any leg and it falls. C = secrets stay secret. I = nobody tampered with it. A = it's there when you need it.\n\nDDoS = attacks Availability. Eavesdropping = attacks Confidentiality. Data tampering = attacks Integrity.`,
        examTip: `Every threat/attack question can link back to CIA. "DDoS = violates which CIA principle?" → Availability. "Encryption protects which?" → Confidentiality. "Hashing protects which?" → Integrity. Know this cold.`,
        facts: ["C = secrecy", "I = accuracy", "A = uptime", "DDoS → A", "Hashing → I", "Encryption → C"]
      },

      {
        id: "aaa",
        title: "AAA (Authentication, Authorization, Accounting)",
        tags: ["both"],
        chain: ["Who are you? (Authentication)", "What can you do? (Authorization)", "What did you do? (Accounting)", "Full access control loop"],
        blurb: "Three questions every access system must answer: prove identity, check permissions, log actions. RADIUS and TACACS+ implement AAA.",
        detail: `<strong>Authentication:</strong>\nProving who you are. Methods:\n• Something you know: password, PIN\n• Something you have: smart card, authenticator app, hardware token\n• Something you are: fingerprint, face ID (biometrics)\n• Somewhere you are: geolocation\n• Something you do: typing pattern (behavioral)\nMFA = using 2+ of these factors.\n\n<strong>Authorization:</strong>\nWhat you're allowed to do after authentication. Enforced by:\n• RBAC (Role-Based Access Control): permissions tied to job role\n• ABAC (Attribute-Based Access Control): permissions based on attributes (department, time, location)\n• MAC (Mandatory Access Control): system enforces labels — clearance-based (used in gov/military)\n• DAC (Discretionary Access Control): resource owner grants permissions\n\n<strong>Accounting:</strong>\nLogging everything: login times, files accessed, commands run, authentication failures. Creates an audit trail.\n\n<strong>RADIUS vs TACACS+:</strong>\nRADIUS: encrypts only the password. Combines authentication + authorization. Standard for network access (VPN, WiFi).\nTACACS+: encrypts the entire payload. Separates authentication, authorization, accounting. Cisco's preferred. Better for device administration.`,
        memory: `AAA = a hotel. Check-in desk (authentication: prove you have a reservation). Room key (authorization: your key only opens your room). Hotel log (accounting: they record when you enter/exit your room).\n\nRADIUS = simple bouncer. TACACS+ = full security team with cameras.`,
        examTip: `RADIUS uses UDP (1812/1813), encrypts only password. TACACS+ uses TCP (49), encrypts everything. MFA = two different factors (type matters — password + PIN = still "something you know" = NOT true MFA).`,
        facts: ["RADIUS=UDP 1812", "TACACS+=TCP 49", "MFA=2+ factors", "RBAC=roles", "ABAC=attributes", "MAC=labels/clearance"]
      },

      {
        id: "encryption",
        title: "Encryption",
        tags: ["sec"],
        chain: ["Readable data (plaintext)", "Encryption algorithm applied", "Key used to scramble it", "Ciphertext created", "Only right key decrypts it"],
        blurb: "Scrambling data so only someone with the key can read it. Symmetric uses one key for both. Asymmetric uses two different keys.",
        detail: `<strong>Symmetric encryption:</strong>\nSame key encrypts and decrypts. Fast. Problem: how do you safely share the key?\n• AES (Advanced Encryption Standard): most common. AES-128 or AES-256. Very fast, very strong.\n• 3DES: old, being phased out.\n• Blowfish/Twofish: alternatives, less common.\n\n<strong>Asymmetric encryption:</strong>\nTwo keys: public key + private key. What one encrypts, only the other can decrypt.\n• Public key: share with everyone.\n• Private key: never share. Keep it secret.\n• If someone encrypts with YOUR public key → only your private key can decrypt it (confidentiality).\n• If you encrypt with YOUR private key → anyone with your public key can verify it was you (digital signature / non-repudiation).\n• RSA: most common asymmetric algorithm.\n• ECC (Elliptic Curve Cryptography): smaller keys, same strength. Better for mobile/IoT.\n\n<strong>Hybrid encryption:</strong>\nMost real systems (HTTPS) use both: asymmetric to exchange a symmetric key, then symmetric for the actual data transfer. Best of both worlds.\n\n<strong>Key lengths:</strong>\nAES-256 = 256-bit key = extremely strong\nRSA-2048 = 2048-bit key = current standard\nRSA-4096 = even stronger`,
        memory: `Symmetric = one padlock key (same key opens and locks). Asymmetric = mailbox (public slot anyone can drop mail in, private key only you have to open it).\n\nHTTPS uses both: RSA to share the AES key, then AES for all the data.`,
        examTip: `AES = symmetric, fast, strong. RSA = asymmetric, slower, used for key exchange. ECC = smaller keys than RSA, same strength. SSL/TLS handshake = asymmetric to exchange keys, then symmetric session. "Encryption at rest" = stored data. "In transit" = moving data.`,
        facts: ["AES = symmetric", "RSA = asymmetric", "ECC = small keys", "AES-256 = strong", "Public key = share", "Private key = keep secret"]
      },

      {
        id: "hashing",
        title: "Hashing",
        tags: ["sec"],
        chain: ["Any input data", "Hash function applied", "Fixed-length output (digest)", "Same input always = same output", "One-way — can't reverse it"],
        blurb: "A one-way fingerprint for data. Hashing verifies integrity — if the hash changes, the data changed. Used for passwords, file verification, digital signatures.",
        detail: `A hash function takes any input and produces a fixed-length string (the hash/digest). The same input always gives the same output. You can't reverse a hash to get the original data.\n\n<strong>Common hash algorithms:</strong>\n• MD5: 128-bit output. Fast but BROKEN — collisions found. Don't use for security.\n• SHA-1: 160-bit output. Also broken. Don't use for new stuff.\n• SHA-256: 256-bit output. Secure. Part of SHA-2 family. Use this.\n• SHA-3: newest, different algorithm. Very secure.\n• HMAC: Hash + secret key = message authentication. Proves who sent it AND that it wasn't changed.\n\n<strong>Password hashing:</strong>\nNever store passwords in plaintext. Hash them. When user logs in, hash what they typed and compare. If someone steals the database, they get hashes, not passwords.\n\n<strong>Salting:</strong>\nAdd a random value (salt) before hashing. Prevents rainbow table attacks (pre-computed hash dictionaries). bcrypt and Argon2 are slow hash functions designed for passwords — they make brute-force attacks impractical.\n\n<strong>Collision:</strong>\nTwo different inputs producing the same hash = collision. MD5 and SHA-1 have known collisions — that's why they're broken for security.`,
        memory: `Hashing = shredding paper. Easy to shred, impossible to un-shred. Same document → same pile of shreds. SHA-256 = industrial shredder. MD5 = old broken shredder.\n\nSalt = adding random confetti before shredding. Even if two people have the same password, their hashes are different.`,
        examTip: `MD5 and SHA-1 are BROKEN — collision vulnerabilities. SHA-256 = secure. HMAC adds a key for authentication. Salting prevents rainbow table attacks. File integrity = check the hash before and after. If hash changed, file was tampered with.`,
        facts: ["MD5=broken", "SHA-1=broken", "SHA-256=secure", "HMAC=hash+key", "Salt=unique per user", "One-way only"]
      },

      {
        id: "pki",
        title: "PKI & Digital Certificates",
        tags: ["sec"],
        chain: ["Website has asymmetric key pair", "Certificate Authority signs the public key", "Certificate issued", "Browser trusts the CA", "Connection secured"],
        blurb: "The system that makes HTTPS work. A trusted Certificate Authority (CA) vouches for websites by signing their public keys. Your browser trusts the CA, so it trusts the site.",
        detail: `PKI = Public Key Infrastructure\n\n<strong>Digital Certificate:</strong>\nA document binding a public key to an identity (domain name, organization). Signed by a Certificate Authority.\n\nContains: subject (who it's for), public key, issuer (CA), validity period, serial number, signature.\n\n<strong>Certificate Authority (CA):</strong>\nA trusted third party that signs certificates. Your browser/OS has a built-in list of trusted CAs (root CAs).\n\n<strong>Chain of Trust:</strong>\nRoot CA → Intermediate CA → End-entity certificate\nRoot CAs are offline (protected). Intermediate CAs do the actual signing.\n\n<strong>Certificate types:</strong>\n• DV (Domain Validated): just proves you own the domain. Fast, cheap.\n• OV (Organization Validated): also verifies the organization is real. Shown in cert details.\n• EV (Extended Validation): highest verification. Used to show green bar (now less common).\n• Wildcard: *.example.com — covers all subdomains.\n\n<strong>Key concepts:</strong>\n• CRL (Certificate Revocation List): list of revoked certs the CA publishes\n• OCSP (Online Certificate Status Protocol): real-time check if a cert is revoked\n• CSR (Certificate Signing Request): how you ask a CA to sign your cert`,
        memory: `PKI = passport system. CA = government. Certificate = passport. When you see a website's padlock, a trusted CA is saying "we verified this site is who they say they are, here's their public key."\n\nExpired cert = expired passport. Revoked cert = stolen passport.`,
        examTip: `CRL = list of revoked certs (downloaded periodically). OCSP = real-time revocation check. Self-signed cert = no CA, browsers don't trust it. Certificate pinning = app only accepts specific certs. Know the difference between root/intermediate CAs.`,
        facts: ["CA = trusted issuer", "CRL = revoked list", "OCSP = real-time check", "Wildcard = *.domain.com", "CSR = cert request", "Root CA = offline"]
      },

      {
        id: "threats-attacks",
        title: "Common Threats & Attack Types",
        tags: ["sec"],
        chain: ["Attacker has a goal", "Chooses an attack type", "Exploits a vulnerability", "Achieves impact", "You need to know each one"],
        blurb: "The most tested attack types for Security+. Every attack has a pattern — learn the pattern, not just the name.",
        detail: `<strong>Social Engineering (human attacks):</strong>\n• Phishing: fake emails that look real. Click the link → credentials stolen.\n• Spear phishing: targeted phishing, personalized to the victim.\n• Vishing: phone call phishing (voice).\n• Smishing: SMS/text phishing.\n• Whaling: phishing targeting executives/CEOs.\n• Pretexting: making up a scenario to manipulate someone ("Hi, I'm from IT, I need your password").\n• Baiting: leaving a malware USB in a parking lot hoping someone plugs it in.\n• Tailgating/Piggybacking: physically following someone through a secure door.\n\n<strong>Malware types:</strong>\n• Virus: needs a host file, spreads when you run it, self-replicates.\n• Worm: no host needed, spreads itself across networks automatically.\n• Trojan: looks legitimate, hides malware. Doesn't self-replicate.\n• Ransomware: encrypts your files, demands payment for the key.\n• Spyware: secretly monitors your activity.\n• Adware: unwanted ads. Often bundled with free software.\n• Rootkit: hides deep in the OS, very hard to detect/remove.\n• Keylogger: records keystrokes. Steals passwords.\n• Botnet: network of infected computers controlled by attacker (C2/C&C).\n\n<strong>Network attacks:</strong>\n• DDoS: flood a server with traffic until it can't respond.\n• Man-in-the-Middle (MitM): attacker sits between two communicating parties, intercepts/modifies traffic.\n• ARP Poisoning: fake ARP replies to redirect traffic through attacker's machine.\n• DNS Poisoning: fake DNS records, redirect victims to fake sites.\n• SQL Injection: inject SQL code through an input field to manipulate a database.\n• Cross-Site Scripting (XSS): inject scripts into web pages that execute in victims' browsers.\n• Replay attack: capture valid authentication data, resend it later to authenticate.\n• Pass-the-hash: steal an authentication hash and use it directly without knowing the password.`,
        memory: `Virus = flu (needs contact to spread). Worm = COVID (spreads itself). Trojan = gift horse (hides evil inside). Ransomware = kidnapper (holds data hostage).\n\nPhishing = fishing (casting a wide net). Spear phishing = bow hunting (targeted, specific victim).`,
        examTip: `Worm = self-propagating, no host. Virus = needs host file. Trojan = disguised. Ransomware = encrypts data for payment. For social engineering: Authority, Urgency, Scarcity, Social Proof, Liking, Fear are the six influence tactics attackers use.`,
        facts: ["Worm=self-spread", "Virus=needs host", "Trojan=disguised", "Ransomware=encrypts", "Phishing=email", "MitM=intercepts", "SQLi=database", "XSS=scripts"]
      },

      {
        id: "zero-trust",
        title: "Zero Trust Architecture",
        tags: ["sec"],
        chain: ["Old model: inside = trusted", "Zero Trust: trust nobody automatically", "Verify every access request", "Least privilege enforced", "Assume breach already happened"],
        blurb: "Never trust, always verify. Zero Trust treats every user, device, and network connection as potentially compromised — even inside the corporate network.",
        detail: `<strong>Old model (Castle-and-Moat):</strong>\nFirewall = moat. Inside = trusted. Once you're inside the network, you could access almost anything. This worked when everyone was in the office. It breaks when:\n• Employees work remotely\n• Cloud services are outside the network\n• An attacker gets inside via malware/phishing\n\n<strong>Zero Trust principles:</strong>\n1. Verify explicitly: always authenticate and authorize based on all available data (identity, location, device health, service/workload, data classification)\n2. Use least privilege: minimize access. Just enough to do the job, nothing more.\n3. Assume breach: act as if attackers are already inside. Minimize blast radius. Segment everything. Encrypt everything.\n\n<strong>Key Zero Trust components:</strong>\n• Identity is the new perimeter: strong authentication (MFA) for everyone, everywhere\n• Device health checks: is this device up to date? Compliant with policy?\n• Microsegmentation: divide the network into tiny segments, strict rules between each\n• Continuous monitoring: don't just verify at login — re-verify throughout the session\n• SASE (Secure Access Service Edge): cloud-delivered network + security (combines SD-WAN + ZTNA)\n• ZTNA (Zero Trust Network Access): replaces VPN with per-app access control`,
        memory: `Zero Trust = suspicious hotel. Even if you work there, you still need your ID to enter every room. And they check your ID every hour, not just once at the door. Contrast with castle-and-moat: once you cross the drawbridge, you can go anywhere inside.`,
        examTip: `Zero Trust is a major focus in Security+ 701. "Implicit trust" = bad (old model). "Continuous verification" = Zero Trust. Microsegmentation limits lateral movement. Least privilege = users only get minimum access needed. ZTNA = modern replacement for traditional VPN.`,
        facts: ["Never trust, always verify", "Least privilege", "Assume breach", "Microsegmentation", "Identity = new perimeter", "ZTNA replaces VPN"]
      },

      {
        id: "incident-response",
        title: "Incident Response",
        tags: ["sec"],
        chain: ["Incident detected", "Analyze & contain it", "Remove the threat", "Restore systems", "Learn from it"],
        blurb: "The playbook for what to do when something goes wrong. Six phases that every Security+ candidate must know in order.",
        detail: `The NIST Incident Response lifecycle has 4 phases. CompTIA uses 6 steps:\n\n<strong>CompTIA IR Steps (memorize this order):</strong>\n1. <strong>Preparation</strong>: build the IR plan, train the team, set up tools BEFORE incidents happen\n2. <strong>Identification/Detection</strong>: something triggered an alert — is this actually an incident?\n3. <strong>Containment</strong>: stop it from spreading. Disconnect infected systems. Short-term (stop bleeding) vs long-term (fix properly).\n4. <strong>Eradication</strong>: remove the malware/attacker completely. Patch the vulnerability. Confirm clean.\n5. <strong>Recovery</strong>: restore systems to normal operation. Monitor closely after restoration.\n6. <strong>Lessons Learned</strong>: what happened? What worked? What failed? Update the IR plan.\n\n<strong>Forensics during IR:</strong>\nOrder of volatility — collect evidence from most volatile to least:\nRegisters/cache → RAM → Network state → Running processes → Storage → Backups\nNever alter evidence. Chain of custody = document who touched it.\n\n<strong>Key metrics:</strong>\n• MTTR (Mean Time to Repair/Recover): average time to fix after failure\n• MTTF (Mean Time to Failure): average time a system works before failing\n• MTBF (Mean Time Between Failures): how long between failures on average`,
        memory: `IR = PICERL: Prepare, Identify, Contain, Eradicate, Recover, Lessons Learned.\n\nThink of it as a fire: set up sprinklers first (Prep), see smoke (ID), close the fire doors (Contain), put out the fire (Eradicate), reopen the building (Recover), inspect why it started (Lessons).`,
        examTip: `Order matters! Contain BEFORE eradicate. Collect volatile evidence FIRST (RAM before hard drive). Chain of custody = who handled evidence and when. IR plan must exist BEFORE an incident — Preparation is #1.`,
        facts: ["PICERL order", "Contain before eradicate", "RAM = most volatile", "Chain of custody", "MTTR/MTBF metrics", "Lessons learned = close loop"]
      },

      {
        id: "vulnerability-management",
        title: "Vulnerability Management",
        tags: ["sec"],
        chain: ["System has flaws", "Scan identifies them", "Prioritize by risk", "Patch or mitigate", "Verify fix & rescan"],
        blurb: "The ongoing process of finding, ranking, and fixing security weaknesses before attackers exploit them. Never a one-time task.",
        detail: `<strong>Vulnerability vs Threat vs Risk vs Exploit:</strong>\n• Vulnerability: a weakness (unlocked door)\n• Threat: something that could exploit it (burglar)\n• Risk: likelihood × impact of that happening\n• Exploit: code/method that actually uses the vulnerability\n• CVE (Common Vulnerabilities and Exposures): standardized IDs for known vulnerabilities (CVE-2024-12345)\n\n<strong>CVSS (Common Vulnerability Scoring System):</strong>\nScores vulnerabilities 0-10 based on impact and exploitability.\n• 0.1–3.9 = Low\n• 4.0–6.9 = Medium\n• 7.0–8.9 = High\n• 9.0–10.0 = Critical\n\n<strong>Types of vulnerability scans:</strong>\n• Credentialed scan: scanner logs in to the target. Deeper results, fewer false positives.\n• Non-credentialed (unauthenticated): external attacker's view. Faster, less detail.\n• Active scan: actively probes targets (creates network traffic)\n• Passive scan: watches traffic without sending probes\n\n<strong>Patch management:</strong>\nZero-day: vulnerability with no patch available yet. Attacker exploits it before the vendor knows.\nPatch Tuesday: Microsoft releases patches on the 2nd Tuesday of each month.\nVirtual patching: block the exploit at the firewall/IPS while you wait for the real patch.\n\n<strong>Remediation priority:</strong>\nNot everything gets patched immediately. Risk-based approach: CVSS score + asset criticality + exploitability in the wild.`,
        memory: `CVE = library catalog number for a known bug. CVSS = how dangerous it is (1-10). Zero-day = the library doesn't have the book catalogued yet, but attackers are already reading it.\n\nCredentialed scan = inspector who has a key. Non-credentialed = inspector checking from the outside.`,
        examTip: `CVE IDs identify specific vulnerabilities. CVSS scores them. Zero-day = no patch exists yet. Credentialed scan = more accurate, fewer false positives. False positive = scan says vulnerable but it's not. False negative = scan misses a real vulnerability.`,
        facts: ["CVE=vuln ID", "CVSS=0-10 score", "9-10=Critical", "Zero-day=no patch", "Credentialed=deeper", "Patch Tuesday=2nd Tue"]
      },

      {
        id: "cryptography-use-cases",
        title: "Cryptography Use Cases",
        tags: ["sec"],
        chain: ["Data needs protection", "At rest = encrypt storage", "In transit = TLS/VPN", "In use = harder (homomorphic)", "Keys managed carefully"],
        blurb: "Crypto isn't just one thing — different situations need different approaches. Where data is and what it's doing determines which crypto to apply.",
        detail: `<strong>Data states:</strong>\n• Data at rest: stored on disk, database, USB. Encrypt with AES-256. Full-disk encryption (FDE) or file-level.\n• Data in transit: moving across a network. Protect with TLS, VPN, SFTP.\n• Data in use: being processed in RAM. Hardest to protect. Emerging: homomorphic encryption (compute on encrypted data).\n\n<strong>Common crypto implementations:</strong>\n• TLS 1.3: current standard for data in transit. Faster handshake than TLS 1.2, forward secrecy by default.\n• AES-256-GCM: authenticated encryption — provides both confidentiality AND integrity.\n• RSA-2048 or ECC P-256: key exchange and digital signatures.\n• bcrypt/Argon2: password hashing (slow by design to prevent brute force).\n• PBKDF2: password-based key derivation.\n\n<strong>Forward Secrecy (Perfect Forward Secrecy / PFS):</strong>\nEven if the server's private key is stolen later, past sessions can't be decrypted. Each session gets a unique temporary key (ephemeral key). TLS 1.3 requires it.\n\n<strong>Key management:</strong>\nHardest part of crypto. If you lose the key, data is gone. If attacker gets the key, all data is exposed.\n• HSM (Hardware Security Module): dedicated hardware for storing and using keys. Keys never leave the HSM.\n• KMS (Key Management Service): cloud service for managing keys (AWS KMS, Azure Key Vault).`,
        memory: `TLS = wrapping your message in tamper-evident packaging for shipping. AES = the lock on your safe. RSA = the way you agree on which lock to use before you start.\n\nForward secrecy = using a different lock for every conversation so stealing one key doesn't unlock old conversations.`,
        examTip: `TLS 1.3 = current standard (1.0 and 1.1 deprecated). SSL is dead — always say TLS. PFS = ephemeral keys, TLS 1.3 requires it. HSM = hardware key storage. AES-GCM = authenticated encryption (confidentiality + integrity together).`,
        facts: ["TLS 1.3=current", "SSL=deprecated", "PFS=ephemeral keys", "HSM=hardware keys", "AES-256-GCM=auth encrypt", "bcrypt=password hashing"]
      },

      {
        id: "access-control-models",
        title: "Access Control Models",
        tags: ["sec"],
        chain: ["User requests resource", "Access control model decides", "Based on rules/roles/labels", "Access granted or denied", "Action logged"],
        blurb: "Four different systems for deciding who can access what. Each has trade-offs between flexibility, control, and complexity.",
        detail: `<strong>MAC (Mandatory Access Control):</strong>\nThe system enforces access based on labels/classifications. Users can't change permissions on their own objects. Used in government/military.\nExample: a "Top Secret" user can't share a document with a "Secret" clearance person, even if they want to.\nOperating systems: SELinux, older UNIX.\n\n<strong>DAC (Discretionary Access Control):</strong>\nResource owners control access to their own resources. Most flexible, least secure.\nExample: Windows NTFS permissions. You own a file → you decide who can read/write it.\nRisk: if your account is compromised, attacker inherits all your DAC permissions.\n\n<strong>RBAC (Role-Based Access Control):</strong>\nPermissions assigned to roles, users assigned to roles. Most common in enterprise.\nExample: "HR Manager" role = read access to HR files. "Accountant" = read/write to financial systems.\nEasier to manage at scale than DAC. Principle of least privilege enforced per role.\n\n<strong>ABAC (Attribute-Based Access Control):</strong>\nAccess based on attributes of the user, resource, and environment. Most flexible, most complex.\nExample: "Finance employees in the New York office between 9am-5pm on weekdays can access payroll data."\nAttributes: department, job title, location, time of day, device type, clearance level.\n\n<strong>Rule-Based Access Control:</strong>\nGlobal rules applied to everyone. Firewall rules are an example — "nobody from IP range X can access port Y."`,
        memory: `MAC = strict librarian (clearance label = that's final, can't override). DAC = owner leaves a spare key under the mat (you decide who gets in). RBAC = job title determines your badge access. ABAC = smart door that checks your title, location, time, and mood.`,
        examTip: `MAC = labels/clearance, system-enforced, can't override (military). DAC = owner controls (most flexible, least secure). RBAC = roles (most common in enterprise). ABAC = attributes (most granular, most complex). Least privilege = RBAC enforces this naturally.`,
        facts: ["MAC=labels/clearance", "DAC=owner controls", "RBAC=roles", "ABAC=attributes", "MAC=most restrictive", "RBAC=enterprise standard"]
      },

      {
        id: "siem-soar",
        title: "SIEM & SOAR",
        tags: ["sec"],
        chain: ["Security events happen everywhere", "SIEM collects and correlates logs", "Alert generated on suspicious pattern", "SOAR automates the response", "Analyst handles the rest"],
        blurb: "SIEM = the brain that sees everything happening across your network. SOAR = the hands that automatically respond to it.",
        detail: `<strong>SIEM (Security Information and Event Management):</strong>\nCollects logs from everything: firewalls, servers, endpoints, cloud, apps. Normalizes them into a common format. Correlates events across sources to find patterns that no single device would see.\n\nKey features:\n• Log aggregation from all sources\n• Normalization (different log formats → one standard)\n• Correlation rules: "3 failed logins + 1 success from same IP = possible brute force"\n• Alerting and dashboards\n• Compliance reporting (HIPAA, PCI DSS audit logs)\n• Long-term log retention\n\nExamples: Splunk, IBM QRadar, Microsoft Sentinel, Elastic SIEM\n\n<strong>SOAR (Security Orchestration, Automation, and Response):</strong>\nTakes SIEM alerts and automates the response. Uses playbooks — predefined workflows.\n\nExample playbook for phishing:\n1. Alert fires from SIEM (employee reported phishing email)\n2. SOAR automatically extracts IOCs (malicious links, sender)\n3. Blocks the URL in web proxy\n4. Searches for other employees who received same email\n5. Quarantines infected mailboxes\n6. Creates incident ticket\n7. Notifies SOC analyst\nAll in seconds, without human intervention.\n\n<strong>IOC (Indicators of Compromise):</strong>\nEvidence that a system has been compromised: malicious IPs, file hashes, domain names, registry keys. SIEM uses these to detect threats.`,
        memory: `SIEM = security camera system with motion detection. SOAR = robot security guard that acts when the camera trips an alarm.\n\nSIEM without SOAR = a fire alarm that rings but doesn't call the fire department. SOAR calls the fire department automatically.`,
        examTip: `SIEM = aggregate + correlate + alert. SOAR = automate response with playbooks. IOC = evidence of compromise. False positive rate matters — too many alerts = alert fatigue = real alerts missed. Log retention requirements often dictated by compliance (1 year common for PCI).`,
        facts: ["SIEM=collect+correlate", "SOAR=automate response", "Playbooks=SOAR workflows", "IOC=compromise evidence", "Alert fatigue=too many FPs", "Splunk=popular SIEM"]
      },

      {
        id: "compliance-frameworks",
        title: "Compliance Frameworks",
        tags: ["both"],
        chain: ["Company handles sensitive data", "Must follow regulations/standards", "Controls implemented", "Audited for compliance", "Penalties if violated"],
        blurb: "The rulebooks companies must follow. NIST, ISO, HIPAA, PCI DSS, SOC 2 — each targets different industries and risks.",
        detail: `<strong>NIST CSF (Cybersecurity Framework):</strong>\n5 functions: Identify → Protect → Detect → Respond → Recover\nVoluntary framework from NIST. Widely adopted as best practice in the US. Good starting point for any organization.\n\n<strong>ISO 27001:</strong>\nInternational standard for Information Security Management Systems (ISMS). Certifiable — you can get audited and certified. More prescriptive than NIST CSF.\n\n<strong>HIPAA (Health Insurance Portability and Accountability Act):</strong>\nUS law. Protects Protected Health Information (PHI). Applies to healthcare providers, insurers, and their business associates. Violations = significant fines ($100-$1.9M per violation).\n\n<strong>PCI DSS (Payment Card Industry Data Security Standard):</strong>\nProtects cardholder data (credit/debit card numbers). Required for any business that processes cards. 12 requirements covering network security, access control, monitoring, etc.\n\n<strong>SOC 2:</strong>\nFor service companies (SaaS, cloud). Audits against 5 Trust Service Criteria: Security, Availability, Processing Integrity, Confidentiality, Privacy. Type I = design. Type II = operating effectiveness over time.\n\n<strong>GDPR (General Data Protection Regulation):</strong>\nEU law. Protects personal data of EU residents. Applies to ANY company serving EU customers. Fines up to 4% of global annual revenue. Right to be forgotten, consent requirements.\n\n<strong>CMMC (Cybersecurity Maturity Model Certification):</strong>\nFor US defense contractors. 3 levels of cybersecurity maturity. Based on NIST 800-171.`,
        memory: `HIPAA = hospitals. PCI DSS = credit cards. GDPR = EU privacy. SOC 2 = cloud/SaaS audits. NIST CSF = general best practices. ISO 27001 = international certification.\n\nNIST 5 Functions: "I Protect Data, Respond Carefully" = Identify, Protect, Detect, Respond, Recover`,
        examTip: `Know which framework applies to which industry. HIPAA = healthcare. PCI DSS = payment cards. GDPR = EU data. SOC 2 Type II = tested over time (better than Type I). NIST CSF = voluntary but widely adopted. ISO 27001 = internationally certifiable.`,
        facts: ["HIPAA=healthcare", "PCI DSS=cards", "GDPR=EU privacy", "SOC 2=cloud audit", "NIST CSF=5 functions", "ISO 27001=certifiable"]
      },

    ]
  },

  {
    id: "architect-path",
    icon: "🏗️",
    title: "Security Architect Path",
    subtitle: "Advanced concepts for CISSP, CASP+, and real-world architecture roles",
    concepts: [

      {
        id: "threat-modeling",
        title: "Threat Modeling (STRIDE)",
        tags: ["arch"],
        chain: ["System being designed", "Identify what can go wrong", "Categorize threats (STRIDE)", "Rate the risk (DREAD)", "Design controls to mitigate"],
        blurb: "Structured way to think about what could go wrong in a system BEFORE you build it. Security architects do this constantly.",
        detail: `<strong>STRIDE Threat Model (Microsoft):</strong>\n\n• <strong>S</strong>poofing: pretending to be someone/something else. Mitigation: authentication.\n• <strong>T</strong>ampering: modifying data or code. Mitigation: integrity checks, hashing.\n• <strong>R</strong>epudiation: denying you did something. Mitigation: logging, digital signatures.\n• <strong>I</strong>nformation Disclosure: data exposed to unauthorized parties. Mitigation: encryption, access controls.\n• <strong>D</strong>enial of Service: making a service unavailable. Mitigation: rate limiting, redundancy, DDoS protection.\n• <strong>E</strong>levation of Privilege: gaining higher access than allowed. Mitigation: least privilege, role enforcement.\n\n<strong>DREAD Risk Scoring:</strong>\nScores each threat 1-10 in 5 categories:\n• Damage potential\n• Reproducibility\n• Exploitability\n• Affected users\n• Discoverability\n\nAverage the score to prioritize which threats to fix first.\n\n<strong>Process:</strong>\n1. Draw a data flow diagram (DFD)\n2. Identify trust boundaries (where data crosses between trust levels)\n3. Apply STRIDE to each element\n4. Rate with DREAD\n5. Design mitigations`,
        memory: `STRIDE = "Sneaky Thieves Really Infiltrate Dark Elevators"\nSpoofing, Tampering, Repudiation, Information Disclosure, DoS, Elevation of Privilege\n\nEvery S→Authentication, T→Integrity, R→Non-repudiation, I→Confidentiality, D→Availability, E→Least Privilege`,
        examTip: `STRIDE maps to CIA Triad: I→Confidentiality, T/R→Integrity, D→Availability. Trust boundary = where different security levels meet (the most dangerous spots in any system). Data flow diagrams make threats visible.`,
        facts: ["S=Spoofing", "T=Tampering", "R=Repudiation", "I=Info Disclosure", "D=DoS", "E=Elevation", "DREAD=scoring", "DFD=visual"]
      },

      {
        id: "defense-in-depth",
        title: "Defense in Depth",
        tags: ["arch"],
        chain: ["Attack starts", "Hits Layer 1 control (blocked?)", "If not, hits Layer 2", "And Layer 3...", "Must break ALL layers to succeed"],
        blurb: "Multiple layers of security so that if one fails, others still protect you. No single point of failure in your defenses.",
        detail: `Defense in Depth = layered security strategy. Borrowed from military defense — multiple defensive lines so breaching one doesn't end the war.\n\n<strong>The layers (outside to inside):</strong>\n1. Physical: locks, guards, badges, cameras, fences\n2. Perimeter: firewalls, IDS/IPS, DMZ, email filtering\n3. Network: segmentation, VLANs, NAC\n4. Endpoint: AV/EDR, host firewalls, patch management\n5. Application: WAF, secure coding, input validation\n6. Data: encryption at rest/transit, DLP, access controls\n7. Human: security awareness training, policies, MFA\n\n<strong>Principle of Least Privilege (PoLP):</strong>\nGive users only the access they need for their job. Nothing more. Even admins should have separate admin accounts.\n\n<strong>Separation of Duties:</strong>\nNo single person can complete a sensitive action alone. Two-person integrity. Prevents fraud and mistakes.\nExample: the person who requests a payment shouldn't be the same one who approves it.\n\n<strong>Fail-secure vs Fail-open:</strong>\nFail-secure: if a security control fails, it defaults to DENYING access. Safer.\nFail-open: if it fails, it allows access. Sometimes needed for availability (emergency doors).\n\n<strong>Segmentation:</strong>\nDivide systems/networks into segments with access controls between them. Contains breaches. An attacker who compromises the guest WiFi shouldn't be able to reach the payment server.`,
        memory: `Defense in Depth = an onion. Peel one layer, there's another underneath. Or like a castle: moat, walls, inner walls, keep, vault — attacker must defeat each one.\n\nLeast privilege = keycard that only opens the rooms you need for your job.`,
        examTip: `Separation of duties prevents one person from committing fraud alone. Least privilege = minimum required access. Fail-secure vs fail-open: exam asks which is safer (fail-secure). Job rotation also prevents fraud (fresh eyes catch corruption).`,
        facts: ["7 layers", "Fail-secure=deny", "Fail-open=allow", "Least privilege", "Separation of duties", "Job rotation", "Segmentation = contain breaches"]
      },

      {
        id: "cloud-security",
        title: "Cloud Security Fundamentals",
        tags: ["arch"],
        chain: ["Workload moves to cloud", "Shared responsibility model applies", "Cloud provider secures infrastructure", "You secure your data & config", "Misconfiguration = #1 risk"],
        blurb: "Cloud security is mostly about knowing what YOU own vs what the cloud provider owns — and making sure your side is locked down.",
        detail: `<strong>Shared Responsibility Model:</strong>\nThe most important concept in cloud security.\n\n• Cloud provider (AWS/Azure/GCP) is ALWAYS responsible for: physical hardware, hypervisor, network infrastructure, physical security of data centers.\n• Customer is ALWAYS responsible for: data classification, encryption of their data, IAM (who has access), security group rules, application security.\n• The middle varies by service model:\n\nIaaS (like EC2/VMs): YOU manage OS, runtime, app, data. They manage hardware.\nPaaS (like App Service/Lambda): THEY manage OS and runtime. YOU manage app and data.\nSaaS (like Office 365/Salesforce): THEY manage almost everything. YOU manage user accounts and data governance.\n\n<strong>Top cloud security risks:</strong>\n1. Misconfiguration: open S3 buckets, public storage, overly permissive security groups. Responsible for most breaches.\n2. Insufficient IAM: overprivileged roles, leaked API keys, no MFA.\n3. Insecure APIs: cloud is API-driven. Unprotected APIs = attack surface.\n4. Lack of visibility: cloud sprawl, shadow IT, assets you don't know exist.\n\n<strong>Cloud security tools (know the categories):</strong>\n• CSPM (Cloud Security Posture Management): continuously checks your cloud config for misconfigurations.\n• CWPP (Cloud Workload Protection Platform): runtime protection for cloud workloads.\n• CASB (Cloud Access Security Broker): visibility and control over cloud app usage (especially SaaS).\n• CNAPP: combines CSPM + CWPP + more into one platform.`,
        memory: `Shared responsibility = renting an apartment. Landlord (cloud provider) maintains the building, plumbing, walls. You (customer) are responsible for what's inside — locking your door, not leaving valuables visible.\n\nS3 bucket left public = leaving your apartment door open. Most common cloud breach cause.`,
        examTip: `Shared responsibility model is heavily tested. For IaaS: you own the OS up. For SaaS: you own the data + accounts only. Misconfiguration = #1 cloud breach cause. CSPM detects misconfigs automatically. Know IaaS vs PaaS vs SaaS differences for exam.`,
        facts: ["IaaS=you manage OS+", "PaaS=you manage app+", "SaaS=you manage data+", "Misconfiguration=#1 risk", "CSPM=posture mgmt", "CASB=SaaS visibility"]
      },

      {
        id: "secure-design-principles",
        title: "Secure Design Principles",
        tags: ["arch"],
        chain: ["System being designed", "Security built in (not bolted on)", "Principles applied", "Attack surface minimized", "System resilient by design"],
        blurb: "The principles every Security Architect applies to every design. These are the mental checklist before any system goes live.",
        detail: `<strong>Security by Design principles (memorize all of these):</strong>\n\n• <strong>Least Privilege:</strong> give every user, process, and service only the minimum access needed. Nothing extra.\n\n• <strong>Defense in Depth:</strong> multiple security layers. If one fails, others still protect.\n\n• <strong>Fail Secure (Fail Closed):</strong> when a control fails, default to denying access. Not the other way.\n\n• <strong>Separation of Duties:</strong> no single person completes a sensitive action alone. Reduces fraud and errors.\n\n• <strong>Minimize Attack Surface:</strong> disable everything you don't need. Every open port, running service, and installed feature is a potential entry point. Less = safer.\n\n• <strong>Open Design:</strong> security should not rely on keeping the algorithm secret (security through obscurity is not real security). Use publicly reviewed standards.\n\n• <strong>Psychological Acceptability:</strong> security controls should not be so hard to use that people work around them.\n\n• <strong>Economy of Mechanism (KISS):</strong> keep it simple. Complex systems have more bugs and are harder to audit.\n\n• <strong>Complete Mediation:</strong> every access request to every resource must be checked. No caching of permissions without revalidation.\n\n• <strong>Secure Default:</strong> out-of-the-box configuration should be secure. Users opt-in to weaker settings, not opt-out of strong ones.\n\n• <strong>Input Validation:</strong> never trust user input. Always validate, sanitize, and encode on the server side.\n\n• <strong>Immutable Infrastructure:</strong> don't patch running servers — destroy and redeploy from a known-good image.`,
        memory: `These principles are the Security Architect's Ten Commandments. Most start with "assume the user is an idiot, the network is hostile, and the code will be compromised."\n\nFail secure = if in doubt, lock it out. Least privilege = just enough, nothing more.`,
        examTip: `CISSP and CASP+ love these principles. Distinguish "fail secure" (deny on failure) from "fail open" (allow on failure — only for life-safety like emergency exits). "Security through obscurity" = not valid security. Input validation prevents most injection attacks.`,
        facts: ["Least privilege", "Defense in depth", "Fail secure=deny", "Separation of duties", "Minimize attack surface", "Secure by default", "No obscurity-only security"]
      },

      {
        id: "network-security-arch",
        title: "Network Security Architecture",
        tags: ["arch"],
        chain: ["Network designed", "Segmentation applied", "Traffic filtered at each boundary", "Monitoring everywhere", "Attacker contained if they get in"],
        blurb: "How a Security Architect thinks about network design: not just firewalls at the edge, but multiple trust boundaries throughout.",
        detail: `<strong>Security zones (typical enterprise):</strong>\n• Internet zone: untrusted, everything external\n• DMZ: semi-trusted, public-facing servers\n• Corporate network: trusted, internal users\n• Secure zones: finance, HR, PCI-scoped systems\n• Management network: out-of-band network for managing infrastructure (never mixed with production)\n• OT/SCADA: operational technology, isolated from IT\n\n<strong>Network Access Control (NAC):</strong>\nControls who/what can connect to the network. Checks: is this device registered? Is it compliant (patched, AV up to date)? Then assigns network segment accordingly. Non-compliant devices go to a remediation VLAN.\n\n<strong>Microsegmentation:</strong>\nVery fine-grained segmentation down to individual workloads or VMs. Enforced by software-defined networking (SDN) or host-based firewalls. Each app only talks to what it explicitly needs. Reduces lateral movement.\n\n<strong>East-West vs North-South traffic:</strong>\nNorth-South: traffic entering/leaving your network (internet ↔ data center). Traditional firewalls focus here.\nEast-West: traffic between systems INSIDE your network (server to server). Often unmonitored — attacker moves laterally here.\nModern security monitors both. Zero Trust requires inspecting east-west traffic.\n\n<strong>Software Defined Networking (SDN):</strong>\nSeparates the control plane (decisions) from the data plane (forwarding). Network behavior controlled by software. Enables microsegmentation, programmable networks, faster response.`,
        memory: `Old architecture = moat around a castle (only north-south matters). Modern architecture = castle where every room has its own lock (microsegmentation). Even if attacker breaches the outer wall, each room is a new challenge.\n\nNAC = the front desk that checks your ID and escorts you to the right floor.`,
        examTip: `East-west traffic = lateral movement risk. Microsegmentation limits it. NAC verifies device compliance before network access. Management network = always separate (attackers on corporate network shouldn't reach your firewalls). OT/SCADA = air-gapped or heavily isolated from IT.`,
        facts: ["North-South=external", "East-West=lateral", "NAC=device compliance", "Microsegmentation=fine control", "SDN=software-controlled", "OT=isolated from IT"]
      },

      {
        id: "iam-deep",
        title: "Identity & Access Management (IAM)",
        tags: ["arch"],
        chain: ["User has identity", "Identity authenticated", "Access policies evaluated", "Permissions granted", "Actions logged"],
        blurb: "The architecture of who can do what. IAM is the #1 focus area for Security Architects — most breaches involve compromised identity or excessive permissions.",
        detail: `<strong>Core IAM concepts:</strong>\n\n• <strong>Directory Services:</strong> centralized database of users, groups, policies. Active Directory (Microsoft), LDAP (open standard), Azure AD / Entra ID (cloud).\n\n• <strong>SSO (Single Sign-On):</strong> log in once, access many systems. SAML (Security Assertion Markup Language) and OAuth/OIDC are the main protocols.\n\n• <strong>Federation:</strong> your organization's identity trusted by another organization. "Sign in with Google" = Google is the identity provider (IdP).\n\n• <strong>PAM (Privileged Access Management):</strong> special controls for admin accounts. Admins check out credentials, sessions recorded, time-limited access. CyberArk, BeyondTrust = PAM tools.\n\n• <strong>JIT (Just-in-Time) access:</strong> elevated privileges only granted when needed, automatically revoked after. Zero standing privileges.\n\n• <strong>RBAC:</strong> role determines access. "Finance team" role = read access to finance systems.\n\n• <strong>ABAC:</strong> attributes determine access. "Finance employees in New York between 9am-5pm get access to finance systems."\n\n• <strong>Orphaned accounts:</strong> accounts left active after employee leaves. Major security risk. Must be disabled/deleted immediately.\n\n• <strong>Provisioning/Deprovisioning:</strong> formal process to add and remove access. Joiner-Mover-Leaver process.`,
        memory: `IAM = the HR department of your security infrastructure. Hire someone = provision access. Promote them = update roles. They quit = deprovision immediately. Forget to deprovision = orphaned account = backdoor.\n\nSSO = master key that opens many doors. SAML = passport used between organizations.`,
        examTip: `SAML = federation/SSO. OAuth = authorization (what apps can do on your behalf). OIDC = identity layer on top of OAuth (authentication). Orphaned accounts = top cause of breaches. PAM = controls for admin accounts. JIT = zero standing privileges.`,
        facts: ["SAML=SSO/federation", "OAuth=authorization", "OIDC=authentication", "PAM=admin controls", "JIT=temp access", "Orphaned accts=risk", "RBAC=role-based"]
      },

    ]
  },

  {
    id: "cryptography",
    icon: "🔑",
    title: "Cryptography",
    subtitle: "Encryption, keys, protocols, and attacks — the math that makes security work",
    concepts: [

      {
        id: "symmetric-deep",
        title: "Symmetric Encryption — Block Ciphers & Modes",
        tags: ["sec", "arch"],
        chain: ["Plaintext in", "Block cipher chops it up", "Mode of operation chains blocks", "Key applied each round", "Ciphertext out"],
        blurb: "AES is the algorithm. The mode of operation is how it handles data larger than one block — and the wrong mode can break security even with a strong cipher.",
        detail: `<strong>Block vs Stream ciphers:</strong>\nBlock cipher: encrypts fixed-size chunks (AES = 128-bit blocks). If your data is larger, a mode of operation handles the chaining.\nStream cipher: encrypts one bit/byte at a time (RC4, ChaCha20). Faster for streaming data.\n\n<strong>Modes of operation — this is what breaks most implementations:</strong>\n\n• <strong>ECB (Electronic Codebook):</strong> encrypts each block independently. Same plaintext block = same ciphertext block. Never use it. Famous failure: encrypted images show outlines because identical blocks produce identical output.\n\n• <strong>CBC (Cipher Block Chaining):</strong> each block XORed with previous ciphertext before encryption. Requires an IV (Initialization Vector). Sequential — can't parallelize. Vulnerable to padding oracle attacks.\n\n• <strong>CTR (Counter Mode):</strong> turns a block cipher into a stream cipher. Encrypts a counter value, XORs result with plaintext. Parallelizable. No padding needed. But: reusing the same key+counter = catastrophic.\n\n• <strong>GCM (Galois/Counter Mode):</strong> CTR mode + built-in authentication tag. Provides confidentiality AND integrity (AEAD). TLS 1.3 default. AES-256-GCM = what you should be using.\n\n<strong>IV (Initialization Vector):</strong>\nA random value used to ensure identical plaintexts produce different ciphertexts. Must be unique per encryption operation. Never reuse an IV with the same key — especially in CTR/GCM mode where reuse = total break.`,
        memory: `ECB = encrypt your diary and every time you write "Dear diary" it looks the same. GCM = the gold standard — it encrypts AND checks the data wasn't tampered with, in one pass.\n\nMode matters more than people think. AES-ECB with a 256-bit key is still broken. AES-GCM with a 128-bit key is solid.`,
        examTip: `ECB = never use (patterns leak). GCM = preferred (AEAD). CBC = legacy, watch for padding oracle. CTR = fine but IV reuse = broken. For exam: "which mode provides both confidentiality and integrity?" → GCM. "Which mode is most dangerous?" → ECB.`,
        facts: ["AES block=128 bits", "ECB=never use", "GCM=AEAD (auth+encrypt)", "CTR=parallelizable", "CBC=needs IV", "IV reuse=catastrophic"]
      },

      {
        id: "asymmetric-internals",
        title: "Asymmetric Cryptography — How the Math Works",
        tags: ["sec", "arch"],
        chain: ["Hard math problem chosen", "Public/private keys derived from it", "Public key shared freely", "Private key never leaves", "Math makes reversal infeasible"],
        blurb: "RSA, ECC, and Diffie-Hellman all rely on math problems that are easy in one direction and computationally infeasible to reverse. That asymmetry is the whole trick.",
        detail: `<strong>RSA — Integer Factorization Problem:</strong>\nGenerating keys: pick two huge primes p and q. Multiply them: n = p×q. Easy to compute. But given only n, finding p and q back takes longer than the age of the universe (for large enough n).\nPublic key = (n, e). Private key = (n, d) where d is derived from p and q.\nEncryption: ciphertext = plaintext^e mod n\nDecryption: plaintext = ciphertext^d mod n\nSecurity rests entirely on factoring being hard.\n\n<strong>Key sizes:</strong>\nRSA-2048 = current minimum. RSA-4096 = higher security. RSA-1024 = broken, don't use.\nRSA is slow — used only for key exchange and signatures, not bulk encryption.\n\n<strong>Discrete Logarithm Problem (DH, DSA):</strong>\nGiven g^x mod p, find x. Easy to compute forward, hard to reverse.\n\n<strong>Elliptic Curve Discrete Log Problem (ECC):</strong>\nSame idea, different math surface. Much harder per bit → same security with smaller keys.\nRSA-3072 ≈ ECC-256 in security strength.\n\n<strong>Hybrid encryption (how it's actually used):</strong>\n1. Generate a random symmetric key (AES-256)\n2. Encrypt that key with RSA or ECC (asymmetric)\n3. Encrypt actual data with AES (symmetric, fast)\n4. Send both. Recipient decrypts the AES key first, then the data.\nTLS, PGP, SSH — all use this pattern.`,
        memory: `RSA = combination lock where only you know p and q. Anyone can snap the lock shut (encrypt with public key). Only you can open it (private key knows the factors).\n\nAsymmetric = slow and elegant for small things (keys, signatures). Symmetric = fast and dumb for big things (actual data). Real systems use both.`,
        examTip: `RSA security = difficulty of factoring large numbers. ECC = smaller keys, same strength (prefer over RSA for new systems). RSA should never encrypt bulk data directly — only wrap symmetric keys. RSA-2048 = minimum today. ECC-256 = equivalent to RSA-3072.`,
        facts: ["RSA=factoring problem", "ECC=elliptic curve DLP", "RSA-2048=minimum", "ECC-256=RSA-3072 strength", "Hybrid=asym wraps sym key", "Asym=slow, Sym=fast"]
      },

      {
        id: "diffie-hellman",
        title: "Diffie-Hellman Key Exchange",
        tags: ["sec", "arch"],
        chain: ["Two parties, no shared secret yet", "Exchange public values over insecure channel", "Each mixes public + private", "Arrive at same shared secret", "Eavesdropper can't compute it"],
        blurb: "The magic trick of modern cryptography: two parties agree on a shared secret over a completely public channel, and anyone watching can't figure out what that secret is.",
        detail: `DH is not encryption — it's key agreement. It solves the fundamental problem: how do you share a key with someone if you've never met and someone is listening to everything?\n\n<strong>How it works (simplified):</strong>\n1. Agree publicly on a large prime p and a generator g (public, attacker knows these)\n2. Alice picks a secret number a. Computes A = g^a mod p. Sends A to Bob.\n3. Bob picks a secret number b. Computes B = g^b mod p. Sends B to Alice.\n4. Alice computes: s = B^a mod p = g^(ab) mod p\n5. Bob computes: s = A^b mod p = g^(ab) mod p\n6. Both have s. Attacker has A, B, g, p — but computing a or b = discrete log problem = infeasible.\n\n<strong>DHE (Ephemeral DH):</strong>\nA new keypair generated for EVERY session. Private keys discarded after. This gives Perfect Forward Secrecy (PFS) — if the server's long-term private key is stolen later, past sessions stay encrypted because those ephemeral keys are gone.\n\n<strong>ECDHE:</strong>\nSame idea, using elliptic curve math. Smaller, faster. What TLS 1.3 uses by default.\n\n<strong>Static DH (no ephemeral):</strong>\nReuses the same keys. No PFS. If private key leaks, all past sessions can be decrypted. Deprecated in TLS 1.3.`,
        memory: `DH = paint mixing. You and a friend each have a secret color. Start with a shared public color. Each mixes in your secret, exchange the mixtures publicly. Each mixes the other's mixture with your secret. Same final color. Eavesdropper can't reverse the mixing.\n\nEphemeral = use a new secret color every conversation. Yesterday's conversations stay safe even if today's secret leaks.`,
        examTip: `DH = key agreement, not encryption. DHE/ECDHE = ephemeral = Perfect Forward Secrecy. TLS 1.3 requires PFS — no static DH or RSA key exchange. "How does TLS achieve PFS?" → ECDHE. The discrete log problem is what makes DH secure.`,
        facts: ["DH=key agreement", "Not encryption", "DHE=ephemeral=PFS", "ECDHE=ECC version", "TLS 1.3=ECDHE required", "Static DH=no PFS", "Discrete log=hard problem"]
      },

      {
        id: "ecc-deep",
        title: "Elliptic Curve Cryptography (ECC)",
        tags: ["sec", "arch"],
        chain: ["Curve defined over finite field", "Points form a mathematical group", "Point multiplication easy", "Reversing it (ECDLP) is hard", "That hardness = security"],
        blurb: "ECC gives you RSA-level security with keys roughly 10× smaller. It's why your phone can do TLS and your IoT device can sign firmware updates.",
        detail: `<strong>The math (conceptually):</strong>\nAn elliptic curve: y² = x³ + ax + b. Points on this curve form a group — you can "add" points together.\nScalar multiplication: start at point P, add it to itself k times → Q = k×P. Easy to compute.\nThe hard part: given P and Q, find k. That's the Elliptic Curve Discrete Logarithm Problem (ECDLP). Much harder per bit than RSA's factoring.\n\n<strong>Key size comparison:</strong>\nRSA-2048 ≈ ECC-224\nRSA-3072 ≈ ECC-256 (NIST P-256, most common today)\nRSA-7680 ≈ ECC-384\nECC-256 = same security as RSA-3072, but the key is 12× smaller.\n\n<strong>Common curves:</strong>\n• NIST P-256 (secp256r1): most common. Used in TLS, code signing, FIDO2.\n• NIST P-384: higher security, US gov requirement for Top Secret.\n• Curve25519: designed by Bernstein. Resistant to side-channel attacks by design. Used in Signal, WireGuard, SSH.\n• secp256k1: used by Bitcoin.\n\n<strong>ECC applications:</strong>\n• ECDH / ECDHE: key agreement\n• ECDSA: digital signatures — but depends on good randomness (bad RNG broke ECDSA on PlayStation 3)\n• EdDSA / Ed25519: faster, deterministic signatures (no random number needed). Preferred for new systems.\n\n<strong>Curve25519 vs NIST curves:</strong>\nNIST curves have constants chosen by the NSA with unexplained seeds. No backdoor proven, but Curve25519 has provably transparent, safe parameter selection. Security community prefers it.`,
        memory: `ECC = sports car (faster, smaller, just as powerful as a truck). RSA = a truck. Same job, different engineering.\n\nEd25519 = the specific model most cryptographers prefer today. Used in SSH keys, Signal, WireGuard. If you're generating an SSH key right now: use Ed25519.`,
        examTip: `ECC = smaller keys, same strength, faster operations. ECDSA = ECC-based signatures. Ed25519 = preferred modern signature algorithm. P-256 = most common curve in TLS. ECC-256 ≈ RSA-3072. ECC is vulnerable to quantum computers (Shor's algorithm breaks it).`,
        facts: ["ECC=smaller keys same strength", "P-256=most common", "Curve25519=modern preferred", "ECDSA=signatures", "Ed25519=deterministic", "ECC-256=RSA-3072 strength"]
      },

      {
        id: "aead",
        title: "Authenticated Encryption (AEAD)",
        tags: ["sec", "arch"],
        chain: ["Plaintext in", "Encrypted for confidentiality", "Auth tag computed over ciphertext", "Ciphertext + tag sent", "Receiver verifies tag before decrypting"],
        blurb: "Encryption alone doesn't stop tampering. AEAD combines encryption and integrity in one operation — you can't have confidentiality without the integrity check.",
        detail: `<strong>The problem with encryption-only:</strong>\nEncryption gives confidentiality — nobody can read it. But an attacker can still flip bits in the ciphertext. You decrypt and get garbage or, worse, subtly wrong data. This is a malleability attack. CBC mode is famously exploitable this way (padding oracle attacks).\n\n<strong>Encrypt-then-MAC (the old approach):</strong>\nEncrypt the data, then compute an HMAC over the ciphertext. Receiver checks MAC first, decrypts only if valid. Secure but two operations — easy to get the order wrong (MAC-then-encrypt = vulnerable).\n\n<strong>AEAD (Authenticated Encryption with Associated Data):</strong>\nDoes both in a single integrated operation. An authentication tag is produced alongside the ciphertext. If ANY bit of the ciphertext is modified, decryption fails. The "Associated Data" = headers/metadata you want to authenticate without encrypting (e.g., packet headers).\n\n<strong>AES-GCM:</strong>\nGalois/Counter Mode. AES-CTR for encryption + GHASH for authentication. 128-bit auth tag. Standard in TLS 1.3, IPsec, SSH.\nCritical weakness: nonce reuse with the same key → authentication tag can be forged and the key recovered. Nonce = must be unique every single time.\n\n<strong>ChaCha20-Poly1305:</strong>\nChaCha20 stream cipher + Poly1305 MAC. Faster than AES-GCM on hardware without AES acceleration (mobile, IoT, embedded). Used in TLS 1.3, WireGuard, Signal. Also AEAD.\n\n<strong>Why this matters architecturally:</strong>\nA padding oracle attack (POODLE on SSL 3.0) works by modifying ciphertext and reading error messages. AEAD eliminates this whole attack class — tampered ciphertext simply fails to decrypt.`,
        memory: `Encryption only = tamper-evident envelope with no seal. AEAD = envelope that self-destructs if anyone touches it.\n\nAES-GCM = industry workhorse. ChaCha20-Poly1305 = the mobile-friendly twin. TLS 1.3 supports only these two — no CBC, no unauthenticated modes.`,
        examTip: `AEAD = confidentiality + integrity in one. AES-GCM = most common (TLS 1.3). ChaCha20-Poly1305 = alternative for devices without AES hardware. Nonce reuse in GCM = catastrophic key recovery possible. "What does the auth tag protect?" → proves ciphertext wasn't modified.`,
        facts: ["AEAD=encrypt+authenticate", "AES-GCM=TLS 1.3 default", "ChaCha20-Poly1305=mobile", "Auth tag=128-bit", "Nonce reuse=critical flaw", "TLS 1.3=AEAD only"]
      },

    ]
  },

  {
    id: "quick-ref",
    icon: "⚡",
    title: "Quick Reference",
    subtitle: "Port numbers, acronyms, and exam-day fast facts — scan like a list",
    concepts: [

      {
        id: "port-numbers",
        title: "Port Numbers — The Full List",
        tags: ["both"],
        chain: ["Service runs on a server", "Listens on a specific port", "Client connects to that port", "Communication established"],
        blurb: "Every exam-relevant port number in one place. These come up constantly on both Network+ and Security+.",
        detail: `<strong>FTP (File Transfer Protocol):</strong> TCP 20 (data), TCP 21 (control) — insecure, replaced by SFTP/FTPS\n\n<strong>SSH (Secure Shell):</strong> TCP 22 — secure remote access, SFTP runs over this\n\n<strong>Telnet:</strong> TCP 23 — insecure remote access (plaintext), replaced by SSH\n\n<strong>SMTP (Simple Mail Transfer Protocol):</strong> TCP 25 — sends email between servers\n\n<strong>DNS (Domain Name System):</strong> UDP 53 (mostly), TCP 53 (zone transfers + large responses)\n\n<strong>DHCP:</strong> UDP 67 (server), UDP 68 (client)\n\n<strong>TFTP (Trivial FTP):</strong> UDP 69 — simple, no auth, used for booting/config transfer\n\n<strong>HTTP:</strong> TCP 80 — unencrypted web\n\n<strong>Kerberos:</strong> TCP/UDP 88 — network authentication protocol (Active Directory)\n\n<strong>POP3 (Post Office Protocol v3):</strong> TCP 110 — downloads email, old\n\n<strong>NTP (Network Time Protocol):</strong> UDP 123 — keeps clocks synchronized (critical for Kerberos, certificates, logging)\n\n<strong>NetBIOS:</strong> TCP/UDP 137-139 — old Windows name resolution\n\n<strong>IMAP (Internet Message Access Protocol):</strong> TCP 143 — modern email retrieval, stays on server\n\n<strong>SNMP (Simple Network Management Protocol):</strong> UDP 161 (queries), UDP 162 (traps/alerts)\n\n<strong>LDAP (Lightweight Directory Access Protocol):</strong> TCP 389 — directory services, Active Directory\n\n<strong>HTTPS:</strong> TCP 443 — encrypted web (HTTP + TLS)\n\n<strong>SMB (Server Message Block):</strong> TCP 445 — Windows file/printer sharing\n\n<strong>SMTP Secure (SMTPS):</strong> TCP 465 or 587 — encrypted email sending\n\n<strong>LDAPS (LDAP over SSL/TLS):</strong> TCP 636 — encrypted directory access\n\n<strong>IMAP Secure:</strong> TCP 993\n\n<strong>POP3 Secure:</strong> TCP 995\n\n<strong>RDP (Remote Desktop Protocol):</strong> TCP 3389 — Windows remote desktop\n\n<strong>MySQL:</strong> TCP 3306 — MySQL database\n\n<strong>PostgreSQL:</strong> TCP 5432\n\n<strong>Syslog:</strong> UDP 514 — system log forwarding\n\n<strong>BGP (Border Gateway Protocol):</strong> TCP 179 — internet backbone routing\n\n<strong>RADIUS:</strong> UDP 1812 (auth), UDP 1813 (accounting)\n\n<strong>TACACS+:</strong> TCP 49\n\n<strong>IPsec IKE:</strong> UDP 500\n\n<strong>SQL Server:</strong> TCP 1433`,
        memory: `The most critical ones: 22=SSH, 23=Telnet (bad), 25=SMTP, 53=DNS, 80=HTTP, 443=HTTPS, 3389=RDP, 445=SMB.\n\nFor security: know the INSECURE ones: 23 (Telnet), 21 (FTP), 80 (HTTP), 110 (POP3), 143 (IMAP). Their secure versions are just higher numbers or use SSH.`,
        examTip: `Questions often ask "which should you disable to improve security?" — Telnet (23), FTP (21), HTTP (80) all transmit in cleartext. RDP (3389) is constantly attacked externally — should not be exposed to internet. SMB (445) = ransomware loves this port (WannaCry used it).`,
        facts: ["SSH=22", "FTP=21/20", "SMTP=25", "DNS=53", "HTTP=80", "HTTPS=443", "RDP=3389", "SMB=445", "LDAP=389", "RADIUS=1812"]
      },

      {
        id: "acronyms",
        title: "Acronyms Master List",
        tags: ["both"],
        chain: ["Exam question uses acronym", "You know what it stands for", "You know what it does", "You answer correctly"],
        blurb: "The acronyms that appear most on Network+ and Security+. Knowing the full name usually tells you what it does.",
        detail: `<strong>Networking:</strong>\nDHCP = Dynamic Host Configuration Protocol\nDNS = Domain Name System\nNAT = Network Address Translation\nPAT = Port Address Translation\nVLAN = Virtual Local Area Network\nSTP = Spanning Tree Protocol\nOSPF = Open Shortest Path First\nBGP = Border Gateway Protocol\nNAC = Network Access Control\nSDN = Software Defined Networking\nMPLS = Multiprotocol Label Switching (WAN technology)\nQoS = Quality of Service (prioritizes certain traffic)\n\n<strong>Security:</strong>\nAAA = Authentication, Authorization, Accounting\nACL = Access Control List\nAES = Advanced Encryption Standard\nAPT = Advanced Persistent Threat\nCA = Certificate Authority\nCIA = Confidentiality, Integrity, Availability\nCRL = Certificate Revocation List\nCSIRT = Computer Security Incident Response Team\nDLP = Data Loss Prevention\nEDR = Endpoint Detection and Response\nFDE = Full Disk Encryption\nHSM = Hardware Security Module\nIAM = Identity and Access Management\nIDS = Intrusion Detection System\nIPS = Intrusion Prevention System\nIOC = Indicator of Compromise\nMFA = Multi-Factor Authentication\nMITM = Man-in-the-Middle\nNGFW = Next-Generation Firewall\nOCSP = Online Certificate Status Protocol\nPAM = Privileged Access Management\nPHI = Protected Health Information (HIPAA)\nPII = Personally Identifiable Information\nPKI = Public Key Infrastructure\nRBAC = Role-Based Access Control\nSAML = Security Assertion Markup Language\nSIEM = Security Information and Event Management\nSOAR = Security Orchestration Automation Response\nSOC = Security Operations Center\nSSL = Secure Sockets Layer (deprecated — use TLS)\nTLS = Transport Layer Security\nUBA = User Behavior Analytics\nVPN = Virtual Private Network\nWAF = Web Application Firewall\nZTNA = Zero Trust Network Access\n\n<strong>Compliance:</strong>\nCMMC = Cybersecurity Maturity Model Certification\nGDPR = General Data Protection Regulation\nHIPAA = Health Insurance Portability and Accountability Act\nISMS = Information Security Management System\nPCI DSS = Payment Card Industry Data Security Standard\nSOC 2 = Service Organization Control 2`,
        memory: `Don't try to memorize all at once — group them. Network acronyms (DHCP/DNS/NAT/VLAN) vs Security acronyms (PKI/MFA/SIEM/IAM) vs Compliance (HIPAA/PCI/GDPR).\n\nIf you see an acronym and blank: read each letter as a word. PKI = Public Key Infrastructure = a system for public keys. That usually tells you the function.`,
        examTip: `Both exams love acronym swap questions: "Which technology provides X?" and they list 4 acronyms. Know the function of each. SOC = the team. SIEM = the tool the SOC uses. SOAR = the automation on top of SIEM.`,
        facts: ["AAA=auth+authz+accounting", "CIA=3 goals", "PKI=cert system", "SIEM=log correlation", "SOC=security team", "RBAC=roles", "TLS=not SSL"]
      },

      {
        id: "attack-vectors",
        title: "Attack Surfaces & Vectors",
        tags: ["sec"],
        chain: ["Attacker has a target", "Chooses an attack surface", "Finds a vector to exploit", "Gains initial access", "Lateral movement begins"],
        blurb: "Attack surface = everything that could be targeted. Attack vector = the specific path used. Reducing one reduces the other.",
        detail: `<strong>Attack Surface:</strong>\nAll possible entry points into a system: open ports, running services, user accounts, APIs, physical access, email, web apps, supply chain.\n\n<strong>Common attack vectors:</strong>\n\n• Email/Phishing: most common initial access vector by far. Malicious attachments or links.\n\n• Web application: SQLi, XSS, CSRF, broken auth. OWASP Top 10 covers the main ones.\n\n• Credentials: stolen/leaked/guessed passwords. Password spray (try common passwords on many accounts), credential stuffing (use breached credentials on other sites).\n\n• Unpatched software: CVEs exploited on known-vulnerable versions.\n\n• Supply chain: compromising a software vendor or third-party dependency (SolarWinds attack = classic example).\n\n• Physical: tailgating into a building, malicious USB, shoulder surfing.\n\n• Wireless: evil twin AP (fake WiFi hotspot), deauth attacks.\n\n• Insider threat: malicious or negligent employees with legitimate access.\n\n<strong>Kill Chain (Lockheed Martin Cyber Kill Chain):</strong>\nStages of an attack:\n1. Reconnaissance: gather intel about target\n2. Weaponization: build the exploit/payload\n3. Delivery: send phishing email / exploit web app\n4. Exploitation: code executes on victim\n5. Installation: malware installed, persistence\n6. Command & Control (C2): attacker communicates with malware\n7. Actions on Objectives: data theft, ransomware, destruction\n\n<strong>MITRE ATT&CK:</strong>\nFramework of real attacker tactics, techniques, and procedures (TTPs). Used by defenders to understand how attacks happen and detect them. More detailed than Kill Chain.`,
        memory: `Kill Chain = movie heist plan. Scout the place (recon), build the tools (weaponize), deliver them (delivery), crack the safe (exploit), hide the tools (install), radio HQ (C2), take the money (objective).\n\nBreaking any link in the chain = attack fails. Defenders aim to detect and break as early as possible.`,
        examTip: `Kill Chain: if you stop the attack at Delivery, it never exploits. Detect at Reconnaissance = best case. C2 traffic = beaconing (malware phoning home regularly). MITRE ATT&CK = reference for TTPs, used in threat hunting. Supply chain attack = one breach compromises many downstream.`,
        facts: ["Kill Chain=7 stages", "C2=command&control", "Phishing=#1 vector", "Credential stuffing", "MITRE ATT&CK=TTPs", "Supply chain risk", "Recon=earliest stage"]
      },

      {
        id: "risk-management",
        title: "Risk Management",
        tags: ["both"],
        chain: ["Asset identified", "Threat identified", "Vulnerability assessed", "Risk = likelihood × impact", "Response chosen"],
        blurb: "Risk can never be zero — the goal is managing it to an acceptable level. Four ways to respond: accept, avoid, transfer, mitigate.",
        detail: `<strong>Risk formula:</strong>\nRisk = Threat × Vulnerability × Asset Value\nOr simplified: Risk = Likelihood × Impact\n\n<strong>Risk response options (MATT):</strong>\n• Mitigate (reduce): implement controls to reduce likelihood or impact. Most common.\n• Accept: decide the cost of mitigation > cost of the risk. Document the decision. (Also called residual risk — risk left after mitigations.)\n• Transfer: shift the risk to someone else. Cyber insurance = transferring financial risk. Outsourcing a service = transferring operational risk.\n• Avoid: stop doing the risky activity entirely. If the app is too risky to operate, shut it down.\n\n<strong>Quantitative vs Qualitative risk analysis:</strong>\nQuantitative: numbers. Calculate financial impact.\n• SLE (Single Loss Expectancy) = asset value × exposure factor (% of asset lost in one incident)\n• ARO (Annual Rate of Occurrence) = how often the incident happens per year\n• ALE (Annual Loss Expectancy) = SLE × ARO\nIf ALE > cost of control → implement the control.\n\nQualitative: subjective ratings (High/Medium/Low). Risk matrix. Faster, less precise.\n\n<strong>Risk appetite vs Risk tolerance:</strong>\nRisk appetite: how much risk the organization is willing to accept strategically (high level).\nRisk tolerance: acceptable deviation from the risk appetite in specific situations.`,
        memory: `MATT = Mitigate, Accept, Transfer, Transfer... no: Mitigate, Accept, Transfer, Avoid.\n\nALE = what you lose per year on average. If a control costs less than ALE → worth it. If it costs more → probably just accept the risk.\n\nInsurance = risk transfer. Firewall = risk mitigation. Shutting down a service = risk avoidance.`,
        examTip: `ALE = SLE × ARO. Know these calculations — exam will test them. Residual risk = risk remaining after controls. Inherent risk = risk before any controls. Risk acceptance must be documented and signed off by management. Cyber insurance = risk transfer.`,
        facts: ["ALE=SLE×ARO", "Mitigate=reduce", "Accept=document it", "Transfer=insurance", "Avoid=stop activity", "Residual=leftover risk", "Qualitative=High/Med/Low"]
      },

    ]
  }
];

// Build flat index for search
const ALL_CONCEPTS = SECTIONS.flatMap(s =>
  s.concepts.map(c => ({ ...c, sectionId: s.id, sectionTitle: s.title }))
);
