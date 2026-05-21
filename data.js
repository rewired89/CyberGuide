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
  }
];

// Build flat index for search
const ALL_CONCEPTS = SECTIONS.flatMap(s =>
  s.concepts.map(c => ({ ...c, sectionId: s.id, sectionTitle: s.title }))
);
