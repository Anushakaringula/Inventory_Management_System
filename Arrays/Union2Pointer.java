import java.util.*;
class Union2Pointer
{
	public static void main(String args[])
	{
		int[] a=new int[]{1,3,5,7,9};
		int[] b=new int[]{2,8,4,6,10};
		//int[] u=new int[8];
		//int k=0;
		Set<Integer> s=new TreeSet<Integer>();
		int j=0;
		int i=0;
		//Arrays.sort(a);
		//Arrays.sort(b);
		while(i<a.length && j<b.length)
		{
			if(a[i]<b[j])
			{
				s.add(a[i]);
				i++;
			}
			else if(a[i]>b[j])
			{
				s.add(b[j]);
				j++;
			}
			else
			{
				s.add(a[i]);
				i++;
				j++;
			}
		}
		while(i<a.length)
		{
			s.add(a[i]);
			i++;
		}	
		while(j<b.length)
		{
			s.add(b[j]);
			j++;
		}	
			System.out.print(s);	
	}
}						
		
