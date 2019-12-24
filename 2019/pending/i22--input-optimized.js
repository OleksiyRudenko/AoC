module.exports = ``;

const original = `deal with increment 26
cut 7249
deal with increment 16
cut -5811
deal with increment 63
cut -4598
deal with increment 75
cut -5840
deal with increment 53
deal into new stack
cut -180
deal with increment 4
cut -5974
deal with increment 25
cut -1826
deal with increment 42
cut -2961
deal with increment 32
cut -6089
deal with increment 19
cut -2271
deal with increment 38
cut 8671
deal with increment 63
cut 4526
deal with increment 68
cut -1291
deal with increment 38
cut 6359
deal with increment 41
deal into new stack
deal with increment 9
cut 5347
deal with increment 6
cut -9559
deal with increment 70
cut -7976
deal with increment 56
cut -294
deal with increment 6
cut 2147
deal with increment 37
cut 3562
deal with increment 38
cut -6876
deal with increment 34
cut -9812
deal with increment 68
cut 1670
deal with increment 11
deal into new stack
deal with increment 15
cut -310
deal with increment 4
cut 584
deal with increment 49
cut -3803
deal with increment 38
cut -2287
deal with increment 13
deal into new stack
deal with increment 69
cut 9777
deal with increment 47
cut 218
deal into new stack
cut -805
deal with increment 51
cut 7062
deal into new stack
cut -5375
deal with increment 64
cut 1315
deal into new stack
cut 1582
deal with increment 22
cut 6100
deal into new stack
deal with increment 56
cut 2934
deal with increment 23
cut -5579
deal with increment 35
cut -8518
deal with increment 38
cut -7207
deal into new stack
deal with increment 65
cut -3266
deal into new stack
deal with increment 36
cut 7064
deal with increment 34
cut -8337
deal with increment 2
deal into new stack
deal with increment 75
deal into new stack
cut -8040
deal with increment 33`;

/* optimization rules. Be sure to % modulo wherever possible

deal into stack
deal into stack
===
<nothing>

deal into stack
cut x
===
cut -x
deal into stack

deal into stack
deal with increment x
===
cut -1
deal with increment -x



cut x
deal into stack
===
deal into stack
cut -x

cut x
cut y
===
cut x+y % count

cut x
deal with increment y
===
deal with increment y
cut x*y

deal with increment x
deal with increment y
===
deal with increment x*y

-------------------------------
Optimization rules, shorthanded:

d d <=> null
d c(x) <=> c(-x) d
d i(x) <=> c(-1) i(-x)
c(x) d <=> d c(-x)
c(x) c(y) <=> c(x+y % size)
c(x) i(y) <=> i(y) c(x*y)
i(x) i(y) <=> i(x*y)


ORIGINAL

i(26)
c(7249)
i(16)
c(-5811)
i(63)
c(-4598)
i(75)
c(-5840)
i(53)
d
c(-180)
i(4)
c(-5974)
i(25)
c(-1826)
i(42)
c(-2961)
i(32)
c(-6089)
i(19)
c(-2271)
i(38)
c(8671)
i(63)
c(4526)
i(68)
c(-1291)
i(38)
c(6359)
i(41)
d
i(9)
c(5347)
i(6)
c(-9559)
i(70)
c(-7976)
i(56)
c(-294)
i(6)
c(2147)
i(37)
c(3562)
i(38)
c(-6876)
i(34)
c(-9812)
i(68)
c(1670)
i(11)
d
i(15)
c(-310)
i(4)
c(584)
i(49)
c(-3803)
i(38)
c(-2287)
i(13)
d
i(69)
c(9777)
i(47)
c(218)
d
c(-805)
i(51)
c(7062)
d
c(-5375)
i(64)
c(1315)
d
c(1582)
i(22)
c(6100)
d
i(56)
c(2934)
i(23)
c(-5579)
i(35)
c(-8518)
i(38)
c(-7207)
d
i(65)
c(-3266)
d
i(36)
c(7064)
i(34)
c(-8337)
i(2)
d
i(75)
d
c(-8040)
i(33)

--------------------
Iteration 1 -- grouping

i(26) c(7249) i(16) c(-5811) i(63) c(-4598)
i(75) c(-5840)
i(53) d
c(-180) i(4) c(-5974) i(25) c(-1826) i(42) c(-2961)
i(32) c(-6089) i(19) c(-2271) i(38) c(8671) i(63) c(4526)
i(68) c(-1291) i(38) c(6359)
i(41) d
i(9) c(5347) i(6) c(-9559) i(70) c(-7976) i(56) c(-294)
i(6) c(2147) i(37) c(3562) i(38) c(-6876) i(34) c(-9812)
i(68) c(1670)
i(11) d
i(15) c(-310) i(4) c(584) i(49) c(-3803) i(38) c(-2287)
i(13) d
i(69) c(9777) i(47) c(218)
d
c(-805) i(51) c(7062)
d
c(-5375) i(64) c(1315)
d
c(1582) i(22) c(6100)
d
i(56) c(2934) i(23) c(-5579) i(35) c(-8518)
i(38) c(-7207)
d
i(65) c(-3266)
d
i(36) c(7064) i(34) c(-8337)
i(2) d
i(75) d
c(-8040) i(33)

--------------------
Iteration 2 -- combine while applying rules

i(26) i(16) c(7249*16) c(-5811) i(63) c(-4598)
i(75) c(-5840)
i(53) d
c(-180) i(4) c(-5974) i(25) c(-1826) i(42) c(-2961)
i(32) c(-6089) i(19) c(-2271) i(38) c(8671) i(63) c(4526)
i(68) c(-1291) i(38) c(6359)
i(41) d
i(9) c(5347) i(6) c(-9559) i(70) c(-7976) i(56) c(-294)
i(6) c(2147) i(37) c(3562) i(38) c(-6876) i(34) c(-9812)
i(68) c(1670)
i(11) d
i(15) c(-310) i(4) c(584) i(49) c(-3803) i(38) c(-2287)
i(13) d
i(69) c(9777) i(47) c(218)
d
c(-805) i(51) c(7062)
d
c(-5375) i(64) c(1315)
d
c(1582) i(22) c(6100)
d
i(56) c(2934) i(23) c(-5579) i(35) c(-8518)
i(38) c(-7207)
d
i(65) c(-3266)
d
i(36) c(7064) i(34) c(-8337)
i(2) d
i(75) d
c(-8040) i(33)


 */
