import java.util.*;
class A
{
	public static void main(String args[])
	{
		int a[]=new int[5];
		Scanner sc=new Scanner(System.in);
		for(int i=0;i<5;i++)
		{
			a[i]=sc.nextInt();
		}
		int sl,l,s,ss;
		l=a[0];
		sl=l;
		s=a[0];
		ss=s;
		for(int i=1;i<5;i++)
		{
			if(a[i]>l)
			{
				sl=l;
				l=a[i];
			}
			else if (a[i] > sl && a[i] != l) {
                sl = a[i];
            }
			if(a[i]<s)
			{
				ss=s;
				s=a[i];
			}
			 else if (a[i] < ss && a[i] != s) {
                ss = a[i];
            }	
			
		}
		System.out.print("second largest is:"+sl);
		System.out.print("\nlargest is:"+l);
		System.out.print("\nsecond smallest is:"+ss);
		System.out.print("\nSmallest is:"+s);
	}
}				
