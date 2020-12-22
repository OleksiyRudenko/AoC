const input = [
  `9
2
6
3
1

5
8
4
7
10`,
  `25
37
35
16
9
26
17
5
47
32
11
43
40
15
7
19
36
20
50
3
21
34
44
18
22

12
1
27
41
4
39
13
29
38
2
33
28
10
6
24
31
42
8
23
45
46
48
49
30
14`,
]
  .map(variant =>
    variant.split("\n\n")
      .map(deck => deck.split("\n").map(n => +n))
  );

module.exports = input;
