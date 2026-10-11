/**
 * TCP Handshake & Flow Control Tracer
 */
const TCPSimulator = {
  threeWayHandshake(initialSeq) {
    const seq = initialSeq || 1000;
    return [
      { step: 1, packet: "SYN", sender: "Client", receiver: "Server", details: `Seq=${seq}, Control=SYN` },
      { step: 2, packet: "SYN-ACK", sender: "Server", receiver: "Client", details: `Seq=5000, Ack=${seq + 1}, Control=SYN-ACK` },
      { step: 3, packet: "ACK", sender: "Client", receiver: "Server", details: `Seq=${seq + 1}, Ack=5001, Control=ACK (Connection Established)` }
    ];
  }
};